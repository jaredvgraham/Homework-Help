import mongoose, { Schema, Document } from "mongoose";

export interface ISchool extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  admin: mongoose.Types.ObjectId;
  teachers: mongoose.Types.ObjectId[];
  students: mongoose.Types.ObjectId[];
  classes: mongoose.Types.ObjectId[];
  website?: string; // Optional field
  createdAt: Date;
  updatedAt: Date;
}

const SchoolSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
    website: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const School =
  mongoose.models.School || mongoose.model<ISchool>("School", SchoolSchema);

export default School;
