import mongoose from "mongoose";

const DB_CONNECTION =
  "mongodb+srv://nvc:5RxFJ_vJQt_%40.Dc@web83.kt8po.mongodb.net/?retryWrites=true&w=majority&appName=web83/testt";

const connectDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

export default connectDatabase;
