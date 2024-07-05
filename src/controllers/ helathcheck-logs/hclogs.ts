// server logs , healthcheck
import { Request , Response , NextFunction } from "express";
import { ApiResponse } from "../../types/req-res";

export async function checkHealth(req : Request , res : Response , next : NextFunction){
    return new ApiResponse(200,"server up").send_response(res);
}