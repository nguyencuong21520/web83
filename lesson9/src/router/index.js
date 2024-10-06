import { Router } from "express";
import authRouter from "./auth.router.js";
import postRouter from "./posts.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);

export default router;
