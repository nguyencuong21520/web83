import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const newUser = {
      userName,
      email,
      age,
      avatar,
      password: hashedPassword,
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //Payload là nạp các thông tin mà mình muốn có trong token
    const payload = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token: token,
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
