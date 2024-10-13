import { Router } from "express";
import postController from "../controller/post.controller.js";

const postRouter = Router();

postRouter.get("/", postController.getPost);

export default postRouter;
