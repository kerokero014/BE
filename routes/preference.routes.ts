import express from 'express';
import { addUserPreferencesController } from '../controllers/preferenceController';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /preferences:
 *   post:
 *     summary: Add user preferences
 *     tags: [Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               allergies:
 *                 type: array
 *                 items:
 *                   type: string
 *               dislikes:
 *                 type: array
 *                 items:
 *                   type: string
 *               favorites:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Preferences saved successfully
 *       500:
 *         description: Failed to save preferences
 */
router.post('/', authenticate, addUserPreferencesController);

export default router;
