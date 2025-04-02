import express from 'express';
import {
    addIngredientController,
    getAllIngredientsController,
    getIngredientByIdController,
} from '../controllers/IngredientController';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Add a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nutritionalValue
 *               - quantity
 *               - unit
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the ingredient.
 *               nutritionalValue:
 *                 type: string
 *                 description: The nutritional value information.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the ingredient.
 *               unit:
 *                 type: string
 *                 description: The unit of measurement.
 *     responses:
 *       201:
 *         description: Ingredient added successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Failed to add ingredient.
 */
router.post('/', authenticate, addIngredientController);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to fetch ingredients.
 */
router.get('/', authenticate, getAllIngredientsController);

/**
 * @swagger
 * /ingredients/{ingredientId}:
 *   get:
 *     summary: Get an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the ingredient.
 *     responses:
 *       200:
 *         description: Ingredient details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Ingredient not found.
 *       500:
 *         description: Failed to fetch ingredient.
 */
router.get('/:ingredientId', authenticate, getIngredientByIdController);

export default router;
