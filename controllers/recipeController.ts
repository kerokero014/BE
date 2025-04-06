import { Request, Response } from 'express';
import {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} from '../services/recipeService';

export const createRecipeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, steps, nutritionalValue, description } = req.body;

        // Validate steps
        if (!Array.isArray(steps) || steps.some((step) => !step.step || step.order === undefined)) {
            res.status(400).json({ error: 'Invalid steps format' });
            return;
        }

        const recipe = await createRecipe(title, steps, nutritionalValue, description);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create recipe',
            details: (error as Error).message,
        });
    }
};

export const getAllRecipesController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch recipes',
            details: (error as Error).message,
        });
    }
};

export const getRecipeByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const recipe = await getRecipeById(Number(id));

        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch recipe',
            details: (error as Error).message,
        });
    }
};

export const updateRecipeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, steps, nutritionalValue, description } = req.body;

        // Validate steps
        if (!Array.isArray(steps) || steps.some((step) => !step.step || step.order === undefined)) {
            res.status(400).json({ error: 'Invalid steps format' });
            return;
        }

        const updatedRecipe = await updateRecipe(
            Number(id),
            title,
            steps,
            nutritionalValue,
            description,
        );
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to update recipe',
            details: (error as Error).message,
        });
    }
};

export const deleteRecipeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteRecipe(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete recipe',
            details: (error as Error).message,
        });
    }
};