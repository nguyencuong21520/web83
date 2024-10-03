import express from "express";
import connectDatabase from "./src/database/db.js";
import cors from "cors";
import UserModel from "./src/models/user.js";

const app = express();
const PORT = 3003;

// 1 Initialized database
connectDatabase();

// 2 Define middleware
app.use(cors());
app.use(express.json());

// 3 Define router
app.get("/", (req, res) => {
  res.status(200).json({ Message: "success" });
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    // Check if user already exists

    const newUser = {
      email,
      password,
    };
    const user = new UserModel(newUser);
    await user.save();
    res.status(201).json({ Message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

// 4 Handle Error

// 5 Run server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
