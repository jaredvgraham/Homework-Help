import { Class } from "@/types";
import mongoose, { Schema, Document } from "mongoose";

const ClassDueDateSchema = new Schema({
  classId: mongoose.Types.ObjectId,
  dueDate: Date,
});

const Options = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [Options], required: true },
  answer: { type: String, required: true },
});

export interface IAssignment extends Document {
  title: string;
  description: string;
  class: (typeof ClassDueDateSchema)[];
  teacher: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  youtubeLinks?: string[];
  submissions: mongoose.Types.ObjectId[];

  questions: (typeof QuestionSchema)[];
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    class: { type: [ClassDueDateSchema], required: false },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    youtubeLinks: [{ type: String }],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    // dueDate: { type: Date, required: true },
    questions: { type: [QuestionSchema], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", AssignmentSchema);

export default Assignment;
