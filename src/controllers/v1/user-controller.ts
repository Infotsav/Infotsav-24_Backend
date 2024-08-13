import { Request , Response , NextFunction } from "express";
import { ApiError } from "../../types/req-res";
import { User , RefNums , IUser } from "../../models/userModel";
import { UserResponse , ReferralResponse } from "../../types/req-res";
import bcrypt from "bcryptjs";
import { generateUniqueHash } from "../../utils/hasher";
import jwt from "jsonwebtoken";


export async function ambassadorRegister(req : Request , res : Response , next : NextFunction) {
    const { username , email , password , collegeName , contactNumber } = req.body;

    try {
        if (!username || !email || !password || !contactNumber) {
            throw new ApiError(400, 'INVALID REQUEST BODY');
        }

        let user = await User.findOne({ email : email});
        if (user) {
            throw new ApiError(400, 'User already exists');
        }
        const referralNumber : string = generateUniqueHash(10);
        const refNum = new RefNums({ referralNumber : referralNumber });
        await refNum.save();

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username : username,
            email,
            password: hashedPassword,
            refNumDetails : refNum._id,
            referralNumber : refNum.referralNumber,
            collegeName,
            contactNumber
        });

        await user.save();

        const token = jwt.sign({ userId: user._id,
                                name : username
         }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ "token" : token ,
            "referralNumber" : referralNumber,
            "name" : username
        });
    } catch (err) {
        console.log(err);
        if (err instanceof ApiError) {
            err.send_response(res);
        } else {
            next(err);
        }
    }
}


export async function ambassadorLogin(req : Request , res : Response , next : NextFunction) {
    const {email , password} = req.body;

    try {
        if (!email || !password) {
            throw new ApiError(400, 'INVALID REQUEST BODY');
        }

        let user = await User.findOne({ email : email});
        if (!user) {
            throw new ApiError(400, 'User does not exists');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(400, 'Invalid password');
        }

        const token = jwt.sign({ userId: user._id,
                                name : user.username
         }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ "token" : token ,
            "referralNumber" : user.referralNumber,
            "name" : user.username
        });
    } catch (err) {
        console.log(err)
        if (err instanceof ApiError) {
            err.send_response(res);
        } else {
            next(err);
        }
    }
}

export async function getUserData(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user as IUser;
        if (!user) {
            throw new ApiError(401, 'User not authenticated');
        }

        const referralData = await RefNums.findById(user.refNumDetails);
        if (!referralData) {
            return next(new ApiError(404, 'Referral data not found'));
        }

        const userResponse: UserResponse = {
            name: user.username,
            email: user.email,
            collegeName: user.collegeName,
            referralNumber: user.referralNumber,
            createdAt: user.createdAt,
        };

        const referralResponse: ReferralResponse = {
            referralNumber: referralData.referralNumber,
            createdAt: referralData.createdAt,
            referredCount: referralData.referredCount,
        };

        res.status(200).json({ 
            user: userResponse,
            referral: referralResponse
        });
    } catch (err) {
        if (err instanceof ApiError) {
            err.send_response(res);
        } else {
            next(err);
        }
    }
}