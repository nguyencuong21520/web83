import { Router } from "express";
import commentController from "../controller/comment.controller.js";

const commentRouter = Router();

commentRouter.get("/:postId", commentController.getComment);

export default commentRouter;
