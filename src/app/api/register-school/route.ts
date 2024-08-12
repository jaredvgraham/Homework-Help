import { NextRequest, NextResponse } from "next/server";
import formidable, { IncomingForm, File } from "formidable";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import User from "@/models/UserModel";
import School from "@/models/SchoolModel";
import Class from "@/models/ClassModel";
import connectToDatabase from "@/lib/mongodb";
import { IncomingMessage } from "http";

export const config = {
  api: {
    bodyParser: false, // Important to disable Next.js's default body parser
  },
};

export async function POST(req: NextRequest) {
  await connectToDatabase();

  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    const results: any[] = [];

    // Cast the NextRequest to IncomingMessage for formidable to work
    form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return reject(
          NextResponse.json(
            { error: "Error parsing form data" },
            { status: 500 }
          )
        );
      }

      // Check if the file exists and is a single file
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        return reject(
          NextResponse.json({ error: "No file provided" }, { status: 400 })
        );
      }

      const filePath = file.filepath;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data: any) => results.push(data))
        .on("end", async () => {
          for (const row of results) {
            await processRow(row);
          }
          console.log("Database population complete");
          resolve(
            NextResponse.json({ message: "Database population complete" })
          );
        });
    });
  });
}

async function processRow(row: any) {
  const {
    StudentName,
    StudentEmail,
    ClassName,
    ClassSubject,
    TeacherName,
    TeacherEmail,
    SchoolName,
    SchoolAddress,
    SchoolCity,
    SchoolState,
    SchoolZip,
    SchoolPhone,
    SchoolEmail,
    Website,
  } = row;

  await connectToDatabase();

  let school = await School.findOne({ name: SchoolName });
  if (!school) {
    school = new School({
      name: SchoolName,
      address: SchoolAddress,
      city: SchoolCity,
      state: SchoolState,
      zip: SchoolZip,
      phone: SchoolPhone,
      email: SchoolEmail,
      website: Website,
    });
    await school.save();
  }

  let teacher = await User.findOne({ email: TeacherEmail, role: "teacher" });
  if (!teacher) {
    teacher = new User({
      name: TeacherName,
      email: TeacherEmail,
      role: "teacher",
      school: school._id,
    });
    await teacher.save();
    school.teachers.push(teacher._id);
  }

  let classDoc = await Class.findOne({
    name: ClassName,
    subject: ClassSubject,
    school: school._id,
  });
  if (!classDoc) {
    classDoc = new Class({
      name: ClassName,
      subject: ClassSubject,
      teacher: teacher._id,
      school: school._id,
    });
    await classDoc.save();
    school.classes.push(classDoc._id);
  }

  let student = await User.findOne({ email: StudentEmail, role: "student" });
  if (!student) {
    student = new User({
      name: StudentName,
      email: StudentEmail,
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
}
