import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  message?: string;
  assignment?: mongoose.Types.ObjectId[];
  postType: "assignment" | "announcement";
  class: mongoose.Types.ObjectId[];
  description?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  message: { type: String, required: false },
  assignment: [
    { type: Schema.Types.ObjectId, ref: "Assignment", required: false },
  ],
  postType: {
    type: String,
    enum: ["assignment", "announcement"],
    default: "announcement",
  },
  class: [{ type: Schema.Types.ObjectId, ref: "Class", required: false }],
  description: { type: String, required: false },
  dueDate: { type: Date, required: false },
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
