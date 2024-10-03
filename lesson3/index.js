import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

app.get("", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.post("/users", async (req, res) => {
  try {
    const { userName, email } = req.body;
    if (!userName || !email) {
      return res
        .status(400)
        .json({ error: "User name and email are required" });
    }

    // Check email and userName exist
    const drawEmail = await fetch(`http://localhost:3000/users?email=${email}`);
    const emailExist = await drawEmail.json();

    const drawUserName = await fetch(
      `http://localhost:3000/users?userName=${userName}`
    );
    const userNameExist = await drawUserName.json();

    if (emailExist.length > 0 || userNameExist.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or user name already exists" });
    }

    // Insert new user
    const newUser = {
      id: uuidv4(),
      userName,
      email,
      age: "",
      avatar: "",
    };
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const createdUser = await response.json();

    res.status(201).send({
      message: "Thành công!",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Thất bại! " + error.message,
      data: null,
      error,
    });
  }
});

app.listen(8003, () => {
  console.log("Server is running");
});
