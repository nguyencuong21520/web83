import { Router } from "express";
import postController from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/", (req, res) => {
  res.status(200).json({ message: "Create Post" });
});
postRouter.get("/:id", postController.getPostById);

export default postRouter;
