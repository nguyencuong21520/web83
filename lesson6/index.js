import express from "express";
import cors from "cors";
import connectDatabase from "./src/database/data.js";
import router from "./src/router/index.js";

const app = express();
const PORT = 3006;

// 1 Initialized database
connectDatabase();

// 2 Define middleware
app.use(cors());
app.use(express.json());

// 3 Define router

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// 4 Handle Error

// 5 Run server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// - localhost:3006 ->

// localhost:3006/auth -> auth
// localhost:3006/post -> post
//      localhost:3006/post/detail -> post detail
