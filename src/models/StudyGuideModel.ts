import mongoose, { Schema, Document } from "mongoose";

export interface IStudyGuide extends Document {
  student: mongoose.Types.ObjectId;
  subject: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudyGuideSchema: Schema = new Schema(
  {
    student: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const StudyGuide =
  mongoose.models.StudyGuide ||
  mongoose.model<IStudyGuide>("StudyGuide", StudyGuideSchema);

export default StudyGuide;
