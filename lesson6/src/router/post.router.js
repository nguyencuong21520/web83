import { Router } from "express";
import postController from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/", () => {
  res.status(200).json({ message: "Create comment" });
});

postRouter.get("/", postController.getPost);

export default postRouter;
