import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User} from '../models/userModel';
import { ApiError } from '../types/req-res';
import { JwtPayload } from '../types/misc';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Authorization header missing or invalid'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const user = await User.findById(decoded.userId);
        if (!user) {
            return next(new ApiError(401, 'User not found'));
        }

        req.user = user;

        next();
    } catch (err) {
        next(new ApiError(401, 'Invalid or expired token'));
    }
}
