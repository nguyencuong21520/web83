import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postId: {
      type: String,
      ref: "Post",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Comment", commentSchema);

export default UserModel;
