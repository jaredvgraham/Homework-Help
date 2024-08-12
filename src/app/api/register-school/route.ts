import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import connectToDatabase from "@/lib/mongodb";
import School from "@/models/SchoolModel";
import User from "@/models/UserModel";
import Class from "@/models/ClassModel";
import { auth } from "@/auth";
import Papa from "papaparse";

export async function POST(req: NextRequest) {
  console.log("Received a request to process CSV file");

  const session = await auth();

  if (!session) {
    console.log("No session found. User not signed in.");
    return NextResponse.json(
      { error: "You must be signed in to view this page." },
      { status: 401 }
    );
  }

  if (session.user.role !== "admin") {
    console.log("User is not an admin:", session.user.role);
    return NextResponse.json(
      { error: "You must be an admin to view this page." },
      { status: 403 }
    );
  }

  const { user } = session;
  await connectToDatabase();
  console.log("Connected to the database");

  try {
    const form = await req.formData();
    const file = form.get("csvFile") as File;

    if (!file) {
      console.log("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const schoolData = {
      name: form.get("name") as string,
      address: form.get("address") as string,
      city: form.get("city") as string,
      state: form.get("state") as string,
      zip: form.get("zip") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      website: form.get("website") as string,
    };

    const newSchool = new School({
      ...schoolData,
      admin: user.id,
    });
    await newSchool.save();

    const buffer = Buffer.from(await file.arrayBuffer());

    const stream = Readable.from(buffer.toString());

    const rows: any[] = [];

    await new Promise<void>((resolve, reject) => {
      Papa.parse(stream, {
        header: true,
        dynamicTyping: true,
        transformHeader: (header) => {
          return normalizeHeader(header);
        },
        complete: function (results) {
          results.data.forEach((row) => {
            rows.push(row);
          });
          resolve();
        },
        error: function (error) {
          console.log("Error parsing CSV file:", error);
          reject(error);
        },
      });
    });

    for (const row of rows) {
      await processRow(row, schoolData);
    }

    return NextResponse.json({ message: "CSV file processed successfully" });
  } catch (error) {
    console.log("Error during processing:", error);
    return NextResponse.json(
      { error: "Something went wrong during processing." },
      { status: 500 }
    );
  }
}

function normalizeHeader(header: string): string {
  const headerMap = {
    "student[_\\s-]?name|student[_\\s-]?full[_\\s-]?name|student[_\\s-]?first[_\\s-]?name|student[_\\s-]?last[_\\s-]?name":
      "StudentName",
    "student[_\\s-]?email": "StudentEmail",
    "class[_\\s-]?name": "ClassName",
    "class[_\\s-]?subject": "ClassSubject",
    "teacher[_\\s-]?name|teacher[_\\s-]?full[_\\s-]?name|teacher[_\\s-]?first[_\\s-]?name|teacher[_\\s-]?last[_\\s-]?name":
      "TeacherName",
    "teacher[_\\s-]?email": "TeacherEmail",
    "school[_\\s-]?name": "SchoolName",
    "school[_\\s-]?address": "SchoolAddress",
    "school[_\\s-]?city": "SchoolCity",
    "school[_\\s-]?state": "SchoolState",
    "school[_\\s-]?zip": "SchoolZip",
    "school[_\\s-]?phone": "SchoolPhone",
    "school[_\\s-]?email": "SchoolEmail",
    website: "Website",
  };

  for (const pattern in headerMap) {
    const regex = new RegExp(pattern, "i");
    if (regex.test(header)) {
      return headerMap[pattern as keyof typeof headerMap];
    }
  }
  return header;
}

async function processRow(row: any, schoolData: any) {
  const extractedData = {
    StudentName: row["StudentName"],
    StudentEmail: row["StudentEmail"],
    ClassName: row["ClassName"],
    ClassSubject: row["ClassSubject"],
    TeacherName: row["TeacherName"],
    TeacherEmail: row["TeacherEmail"],
  };

  await connectToDatabase();

  let school = await School.findOne({ name: schoolData.name });
  if (!school) {
    school = new School({
      ...schoolData,
    });
    await school.save();
  }
  const normalizedEmail = extractedData.TeacherEmail.toLowerCase();

  let teacher;
  console.log("normalizedEmail:", normalizedEmail);

  try {
    teacher = await User.findOneAndUpdate(
      { email: normalizedEmail, role: "teacher" },
      { $set: { name: extractedData.TeacherName, school: school._id } },
      { upsert: true, new: true } // upsert: create if not exists, new: return the updated/new document
    );
    console.log("Teacher processed:", teacher);
  } catch (error) {
    console.log("Error in teacher processing:", error);
    return; // Early exit on error
  }

  let classDoc = await Class.findOne({
    name: extractedData.ClassName,
    subject: extractedData.ClassSubject,
    school: school._id,
  });

  if (!classDoc) {
    classDoc = new Class({
      name: extractedData.ClassName,
      subject: extractedData.ClassSubject,
      teacher: teacher?._id,
      school: school._id,
    });
    await classDoc.save();
    school.classes.push(classDoc._id);
  }

  let student = await User.findOne({
    email: extractedData.StudentEmail,
    role: "student",
  });
  if (!student) {
    student = new User({
      name: extractedData.StudentName,
      email: extractedData.StudentEmail,
      role: "student",
      school: school._id,
      classes: [classDoc._id],
    });
    await student.save();
    school.students.push(student._id);
    classDoc.students.push(student._id);
  } else {
    if (!student.classes.includes(classDoc._id)) {
      student.classes.push(classDoc._id);
      await student.save();
    }
  }

  await school.save();
  await classDoc.save();
  console.log("Finished processing row");
}
