import { Request, Response } from 'express';
import { getSavedRecipesForUser } from '../models/saveRecipe.model';

export const getSavedRecipesController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const savedRecipes = await getSavedRecipesForUser(userId);
        res.json(savedRecipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved recipes' });
    }
};

