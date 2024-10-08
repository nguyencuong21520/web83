import { Router } from "express";
import authRouter from "./auth.router.js";
import commentRouter from "./comment.router.js";
import postRouter from "./post.router.js";
import authorizationToken from "../middleware/auth.mdw.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/comment", commentRouter);
router.use("/post", authorizationToken, postRouter);

export default router;
