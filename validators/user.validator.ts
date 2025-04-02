import { z } from 'zod';

export const CreateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    weightGoal: z.number().optional(),
});

export const UpdateUserSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    weightGoal: z.number().optional(),
});

