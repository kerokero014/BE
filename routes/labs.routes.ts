import { Router } from 'express';
import { generateRecipeController } from '../controllers/labs.controller';

const router = Router();

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate a detailed recipe based on a given craving.
 *     description: >
 *       This endpoint takes a craving and a userId, retrieves user-specific details such as allergies, dislikes,
 *       and favorite foods, then generates a detailed recipe using the OpenAI API.
 *     tags:
 *       - Generate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               craving:
 *                 type: string
 *                 description: The food craving for which the recipe should be generated.
 *                 example: "spicy food"
 *               userId:
 *                 type: number
 *                 description: The ID of the user for whom to generate the recipe.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Recipe successfully generated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Spicy Tofu Stir-Fry"
 *                 description:
 *                   type: string
 *                   example: "A delicious and spicy tofu stir-fry with fresh vegetables."
 *                 nutritionalValue:
 *                   type: string
 *                   example: "Calories: 400, Protein: 20g, Carbs: 50g, Fat: 10g"
 *                 instructions:
 *                   type: string
 *                   example: "1. Heat oil in a pan. 2. Add tofu and stir-fry for 5 minutes..."
 *                 steps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       step:
 *                         type: string
 *                         example: "Heat oil in a pan."
 *                       order:
 *                         type: number
 *                         example: 1
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields: craving and userId are both required."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/generate', generateRecipeController);

export default router;
