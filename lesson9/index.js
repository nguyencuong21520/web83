import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./src/data/db.js";
import router from "./src/router/index.js";

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());
dotenv.config();

connectDatabase();

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
