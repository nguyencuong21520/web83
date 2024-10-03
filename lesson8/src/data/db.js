import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@web83.kt8po.mongodb.net/?retryWrites=true&w=majority&appName=web83/testt`;

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
