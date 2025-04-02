import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { CreateUserSchema, UpdateUserSchema } from '../validators/user.validator';
import { ZodError } from 'zod';

// Define a custom Request interface for authenticated endpoints
interface AuthenticatedRequest extends Request {
    user?: string; // or the appropriate type
}

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const validatedData = CreateUserSchema.parse(req.body);
        const user = await userService.createUser(validatedData);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            next(error);
        }
    }
};

export const getUserById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Use the ID from the URL if provided, otherwise fall back to the authenticated user
        const userId = req.params.id || req.user;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        const user = await userService.getUserById(Number(userId));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const validatedData = UpdateUserSchema.parse(req.body);
        const updatedUser = await userService.updateUser(parseInt(req.params.id), validatedData);
        res.json(updatedUser);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            next(error);
        }
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        await userService.deleteUser(parseInt(req.params.id));
        res.status(201).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
