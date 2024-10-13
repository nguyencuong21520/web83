import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
