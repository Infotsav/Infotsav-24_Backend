import { Router } from "express";
import { checkHealth } from "../../controllers/ helathcheck-logs/hclogs";

export const healthRouter = Router()

healthRouter.route("/health").get(checkHealth);