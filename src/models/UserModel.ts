import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  role: "student" | "parent" | "teacher" | "solo" | "admin" | "none";
  school?: mongoose.Types.ObjectId;
  classes?: mongoose.Types.ObjectId[];
  parent?: mongoose.Types.ObjectId;
  children?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "parent", "teacher", "solo", "admin", "none"],
      default: "none",
    },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
    parent: { type: Schema.Types.ObjectId, ref: "User" },
    children: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
