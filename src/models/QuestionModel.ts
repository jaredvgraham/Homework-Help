import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  questionText: string;
  choices: string[];
  correctChoice: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema(
  {
    questionText: { type: String, required: true },
    choices: { type: [String], required: true },
    correctChoice: { type: String, required: true },
  },
  { timestamps: true }
);

const Question =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
