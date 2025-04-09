import express from 'express';
import {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    updateRecipeController,
    deleteRecipeController,
} from '../controllers/recipeController';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', authenticate, getAllRecipesController);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', authenticate, getRecipeByIdController);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - instructions
 *               - nutritionalValue
 *               - description
 *               - steps
 *             properties:
 *               title:
 *                 type: string
 *               instructions:
 *                 type: string
 *               nutritionalValue:
 *                 type: string
 *               description:
 *                 type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - step
 *                     - order
 *                   properties:
 *                     step:
 *                       type: string
 *                     order:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', createRecipeController);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - instructions
 *               - nutritionalValue
 *               - description
 *               - steps
 *             properties:
 *               title:
 *                 type: string
 *               instructions:
 *                 type: string
 *               nutritionalValue:
 *                 type: string
 *               description:
 *                 type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - step
 *                     - order
 *                   properties:
 *                     step:
 *                       type: string
 *                     order:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', updateRecipeController);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', authenticate, deleteRecipeController);

export default router;
