// validators/recipeValidator.ts
import { z } from 'zod';

export const RecipeSchema = z.object({
    title: z.string().min(3),
    instructions: z.string().min(10),
    nutritionalValue: z.string(),
    description: z.string().min(3),
});
