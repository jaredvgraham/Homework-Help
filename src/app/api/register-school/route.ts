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
  console.log("Session data:", session);

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

    console.log("Received form data:", form);
    console.log("File received:", file);

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

    console.log("School data extracted from form:", schoolData);

    const newSchool = new School({
      ...schoolData,
      admin: user.id,
    });
    await newSchool.save();
    console.log("School saved to the database:", newSchool);

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("Converted file to buffer");

    const stream = Readable.from(buffer.toString());

    const rows: any[] = [];

    await new Promise<void>((resolve, reject) => {
      Papa.parse(stream, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          results.data.forEach((row) => {
            console.log("Row data parsed:", row);
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
      console.log("Processing individual row:", row);
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

async function processRow(row: any, schoolData: any) {
  const extractedData = {
    StudentName: row["StudentName"],
    StudentEmail: row["StudentEmail"],
    ClassName: row["ClassName"],
    ClassSubject: row["ClassSubject"],
    TeacherName: row["TeacherName"],
    TeacherEmail: row["TeacherEmail"],
  };

  console.log("Processing row with extracted data:", extractedData);

  await connectToDatabase();

  let school = await School.findOne({ name: schoolData.name });
  if (!school) {
    school = new School({
      ...schoolData,
    });
    await school.save();
    console.log("Created new school:", school);
  } else {
    console.log("Found existing school:", school);
  }

  let teacher = await User.findOne({
    email: extractedData.TeacherEmail,
    role: "teacher",
  });
  if (!teacher) {
    teacher = new User({
      name: extractedData.TeacherName,
      email: extractedData.TeacherEmail,
      role: "teacher",
      school: school._id,
    });
    await teacher.save();
    school.teachers.push(teacher._id);
    console.log("Created new teacher:", teacher);
  } else {
    console.log("Found existing teacher:", teacher);
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
      teacher: teacher._id,
      school: school._id,
    });
    await classDoc.save();
    school.classes.push(classDoc._id);
    console.log("Created new class:", classDoc);
  } else {
    console.log("Found existing class:", classDoc);
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
    console.log("Created new student:", student);
  } else {
    if (!student.classes.includes(classDoc._id)) {
      student.classes.push(classDoc._id);
      await student.save();
      console.log("Added class to existing student:", student);
    }
  }

  await school.save();
  await classDoc.save();
  console.log("Finished processing row");
}
