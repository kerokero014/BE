// controllers/IngredientController.ts
import { Request, Response } from 'express';
import {
    addIngredientService,
    getAllIngredientsService,
    getIngredientByIdService,
} from '../services/Ingredient.service';

export const addIngredientController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, nutritionalValue, quantity, unit } = req.body;

        if (!name || !nutritionalValue || !quantity || !unit) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const ingredient = await addIngredientService(name, nutritionalValue, quantity, unit);
        res.status(201).json(ingredient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || 'Failed to add ingredient' });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getAllIngredientsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredients = await getAllIngredientsService();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
};

export const getIngredientByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredientId = Number(req.params.ingredientId);

        if (isNaN(ingredientId)) {
            res.status(400).json({ error: 'Invalid ingredient ID' });
            return;
        }

        const ingredient = await getIngredientByIdService(ingredientId);
        if (!ingredient) {
            res.status(404).json({ error: 'Ingredient not found' });
            return;
        }

        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ingredient' });
    }
};
