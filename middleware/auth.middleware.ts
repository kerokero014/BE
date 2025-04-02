import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';

// Create a custom interface that extends Express's Request
interface AuthenticatedRequest extends Request {
    user?: string; // adjust the type if needed
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): void => {
    const { authorization: authHeader } = req.headers;

    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        res.status(401).json({ error: 'Unauthorized: Malformed token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        if (!decoded || !decoded.id) {
            res.status(401).json({ error: 'Unauthorized: Token verification failed' });
            return;
        }

        // Now it's safe to attach the user property
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
        return;
    }
};

export const logout = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
