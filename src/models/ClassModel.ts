import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  subject: string;
  teacher: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  assignments: mongoose.Types.ObjectId[];
  school: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Class =
  mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);

export default Class;
