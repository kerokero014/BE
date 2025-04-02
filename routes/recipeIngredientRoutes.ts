import express from 'express';
import {
    addIngredientToRecipeController,
    removeIngredientFromRecipeController,
    getIngredientsByRecipeIdController,
} from '../controllers/recipeIngredientController';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, addIngredientToRecipeController);
router.delete('/:recipeId/:ingredientId', authenticate, removeIngredientFromRecipeController);
router.get('/:recipeId', authenticate, getIngredientsByRecipeIdController);

export default router;
