import express from "express";

const app = express();
app.use(express.json());

app.get("", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.post("/users", async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ error: "User name is required" });
    }
    const drawUser = await fetch("http://localhost:3000/users/US001");
    const user = await drawUser.json();

    res.status(200).send({
      message: "Thành công!",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Thất bại! " + error.message,
      data: null,
      error,
    });
  }
});

app.listen(8001, () => {
  console.log("Server is running");
});
