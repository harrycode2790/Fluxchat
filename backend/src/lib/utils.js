import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
    if (!ENV.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '3d',
    })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // this will prevent the XSS (cross-site scripting) attacks     
        sameSite: "strict", // CSRF protection
        secure: ENV.NODE_ENV === 'development' ? false : true  // set to true in production
    })

    return token;
}