// controllers/recipeController.ts
import { Request, Response } from 'express';
import * as recipeService from '../services/recipeService';
import { RecipeSchema } from '../validators/recipe.validator';
import { ZodError } from 'zod';

export const createRecipe = async (req: Request, res: Response) => {
    try {
        const { title, instructions, nutritionalValue, description, steps } = req.body;
        await RecipeSchema.parseAsync({
            title,
            instructions,
            nutritionalValue,
            description,
            steps,
        });
        const recipe = await recipeService.createRecipe(
            title,
            steps, // Pass steps to the service
            nutritionalValue,
            description,
        );
        res.status(201).json(recipe);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to create recipe' });
        }
    }
};
export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipe = await recipeService.getRecipeById(Number(id));
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
};

export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, instructions, nutritionalValue, description, steps } = req.body;
        await RecipeSchema.parseAsync({
            title,
            instructions,
            nutritionalValue,
            description,
            steps,
        });
        const recipe = await recipeService.updateRecipe(
            Number(id),
            title,
            steps,
            nutritionalValue,
            description,
        );
        res.status(200).json(recipe);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to update recipe' });
        }
    }
};

export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await recipeService.deleteRecipe(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
};
