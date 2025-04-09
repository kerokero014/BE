// controllers/labs.controller.ts
import { Request, Response, NextFunction } from 'express';
import { generateRecipe } from '../services/labs.service';

export const generateRecipeController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { craving, userId } = req.body;

        if (!craving || !userId) {
            res.status(400).json({
                message: 'Missing required fields: craving and userId are both required.',
            });
            return;
        }

        // Convert userId from string to number
        const numericUserId = Number(userId);
        if (Number.isNaN(numericUserId)) {
            res.status(400).json({ message: 'Invalid userId format.' });
            return;
        }

        // Call the service layer to generate the recipe.
        const recipe = await generateRecipe(craving, numericUserId);

        // Send back the recipe.
        res.status(200).json(recipe);
    } catch (error: any) {
        next(error);
    }
};
