import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    createdAt: {
      type: String,
    },
    content: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
