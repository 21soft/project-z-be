import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JwtSecret } from "../config/config";

declare global {
    namespace Express {
        interface Request {
            session?: any
        }
    }
}

export const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, JwtSecret.accessTokenSecret, {expiresIn: '24h'})
}

export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, JwtSecret.refreshTokenSecret, {expiresIn: '2d'})
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: ReasonPhrases.UNAUTHORIZED
        })
    }

    const token = authHeader.substring(7)

    jwt.verify(token, JwtSecret.accessTokenSecret, (err, decode) => {
        if (err) {
            res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: ReasonPhrases.FORBIDDEN
            })
        }

       req.session = decode
       next()
    })
}