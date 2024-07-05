import { Request , Response ,NextFunction} from "express";
import { ApiError , ErrorWithResponse} from "../types/req-res"

export async function errorMiddleware(err: ErrorWithResponse, req: Request, res: Response, next: NextFunction) {
    const message : string = err.message || "internal server error";
    const stack : string = err.stack || "";
    const status : number = err.status || 500;
    
    return new ApiError(status ,message , stack).send_response(res);
} 