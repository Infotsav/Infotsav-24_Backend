import { Router } from "express";
import { healthRouter } from "./healtcheck/healthcheck";

export const router = Router();

router.use("",healthRouter);
// router.use("/api/v1",...)