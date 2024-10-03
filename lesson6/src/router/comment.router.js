import { Router } from "express";

const commentRouter = Router();

commentRouter.post("/", () => {
  res.status(200).json({ message: "Create comment" });
});

commentRouter.get("/", () => {
  console.log("get comment");
});

export default commentRouter;
