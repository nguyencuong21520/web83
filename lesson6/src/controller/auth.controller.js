import UserModel from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/key.js";

const register = async (req, res) => {
  try {
    const { userName, email, age, avatar, password } = req.body;

    // Check if user already exists
    const checkExistingUser = await UserModel.findOne({
      email: email,
    });

    if (checkExistingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert new user
    const newUser = {
      userName,
      email,
      age,
      avatar,
      password,
    };

    const insertNewUser = await UserModel.create(newUser);
    if (!insertNewUser) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    res.status(200).json({
      message: "User created successfully",
      user: insertNewUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    // Implement login logic here
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordValid = password == user.password;

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //Payload là nạp các thông tin mà mình muốn có trong token
    const payload = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const authController = {
  register,
  login,
};

export default authController;
