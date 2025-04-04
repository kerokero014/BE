import { z } from 'zod';

export const RecipeSchema = z.object({
    title: z.string(),
    instructions: z.string(),
    nutritionalValue: z.string(),
    description: z.string(),
    steps: z.array(
        z.object({
            step: z.string(),
            order: z.number(),
        })
    ),
});