import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      min: 6,
      max: 100,
    },
    avatar: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
