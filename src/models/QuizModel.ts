import mongoose, { Schema, Document } from "mongoose";

interface Question {
  questionText: string;
  choices: string[];
  correctAnswer: string;
}

export interface IQuiz extends Document {
  assignment: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  questions: Question[];
  score: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema(
  {
    assignment: {
      type: mongoose.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        choices: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],
    score: { type: Number },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
