import { Router } from "express";
import { healthRouter } from "./healtcheck/healthcheck";
import { userRouter } from "./v1/user/user-router";

export const router = Router();

router.use("",healthRouter);
router.use("/api/v1",userRouter);