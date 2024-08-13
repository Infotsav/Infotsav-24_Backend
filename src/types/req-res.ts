import { request, Request , Response} from "express";
import { IUser } from "../models/userModel";

// interface RequestWithUser extends Request {
//     user : 
// }

export interface ErrorWithResponse extends Error { 
    status : number
}

export interface RegisterRequest {
    name : string
    email : string
    password : string
    collegeName : string
    contactNumber : string
}

export class ApiResponse{
    status : number
    data : any

    constructor(status : number , data : any){
        this.status = status
        this.data = data
    }

    send_response(res : Response){
        return res.status(this.status).json({"data" : this.data})
    }
}

export class ApiError extends Error {
    status : number 
    message : string 
    stack : string 

    constructor(status : number , message : string , stack : string = ""){
        super(message);
        this.status = status || 500;
        this.message = message;
        this.stack = stack || "";
    }

    send_response(res : Response){
        return res.status(this.status).json({
            "data" : this.message,
            "stack" : this.stack
        });
    }
}

export interface UserResponse{
    name : string, 
    email : string, 
    collegeName : string,
    referralNumber : string,
    createdAt : Date
}

export interface ReferralResponse{
    referralNumber : string,
    createdAt: Date,
    referredCount : number
}