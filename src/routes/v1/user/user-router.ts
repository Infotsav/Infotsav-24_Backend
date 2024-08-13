import { Router } from "express";
import { ambassadorRegister , ambassadorLogin , getUserData} from "../../../controllers/v1/user-controller";
import { authMiddleware } from "../../../middleware/authMiddleware";

export const userRouter = Router()

userRouter.post("/ambassador/login",ambassadorLogin);
userRouter.post("/ambassador/register",ambassadorRegister);
userRouter.get("/me",authMiddleware,getUserData);