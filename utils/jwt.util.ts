// filepath: c:\Users\kevin\OneDrive\Desktop\BE\utils\jwt.util.ts
import jwt from 'jsonwebtoken';
import env from '../config/env';

export const generateToken = (payload: object, expiresIn = '7d') => {
    return jwt.sign(payload, env.JWT_SECRET as string, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};
