import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { z } from 'zod';
import { registerSchema, loginSchema } from '../validators/auth.validator';

export const register = async (req: Request, res: Response) => {
    try {
        const data = registerSchema.parse(req.body);
        const user = await registerUser(data.email, data.password, data.firstName, data.lastName);
        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const data = loginSchema.parse(req.body);
        const result = await loginUser(data.email, data.password);
        res.status(200).json(result);
    } catch (error) {
        const err = error as z.ZodError;
        res.status(500).json({ message: err.message });
    }
};
