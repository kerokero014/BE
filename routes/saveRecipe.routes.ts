import express from 'express';
import { getSavedRecipesController } from '../controllers/saveRecipe.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /saved-recipes/{userId}:
 *   get:
 *     summary: Get saved recipes for a user
 *     description: Retrieves the list of saved recipes for a specific user by their userId.
 *     tags:
 *       - Saved Recipes
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get saved recipes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of saved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the recipe
 *                   description:
 *                     type: string
 *                     description: The description of the recipe
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of ingredients for the recipe
 *                   instructions:
 *                     type: string
 *                     description: Instructions on how to prepare the recipe
 *       400:
 *         description: Invalid userId supplied
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', getSavedRecipesController);

export default router;
