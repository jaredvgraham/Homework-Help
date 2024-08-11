import mongoose, { Schema, Document } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  description: string;
  class: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  youtubeLinks: string[];
  submissions: mongoose.Types.ObjectId[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    youtubeLinks: [{ type: String }],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", AssignmentSchema);

export default Assignment;
