import { Request, Response } from 'express';
import {
    addIngredientToRecipeService,
    removeIngredientFromRecipeService,
    getIngredientsByRecipeIdService,
} from '../services/recipeIngredient.service';


export const addIngredientToRecipeController = async (req: Request, res: Response) => {
    try {
        const { recipeId, ingredientId, quantity, unit } = req.body;
        const recipeIngredient = await addIngredientToRecipeService(
            recipeId,
            ingredientId,
            quantity,
            unit,
        );
        res.status(201).json(recipeIngredient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add ingredient to recipe' });
    }
};

export const removeIngredientFromRecipeController = async (req: Request, res: Response) => {
    try {
        const { recipeId, ingredientId } = req.params;
        await removeIngredientFromRecipeService(Number(recipeId), Number(ingredientId));
        res.json({ message: 'Ingredient removed from recipe successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove ingredient from recipe' });
    }
};

export const getIngredientsByRecipeIdController = async (req: Request, res: Response) => {
    try {
        const recipeId = Number(req.params.recipeId);
        const ingredients = await getIngredientsByRecipeIdService(recipeId);
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe ingredients' });
    }
};
