import express from 'express';
import {
    addAllergyController,
    removeAllergyController,
    getAllergiesByUserIdController,
    updateAllergyController,
} from '../controllers/allergyController';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /allergies:
 *   post:
 *     summary: Add a new allergy for a user
 *     tags: [Allergies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               allergyName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Allergy added successfully
 *       500:
 *         description: Failed to add allergy
 */
router.post('/', authenticate, addAllergyController);

/**
 * @swagger
 * /allergies/{userId}/{allergyId}:
 *   delete:
 *     summary: Remove an allergy for a user
 *     tags: [Allergies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: allergyId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Allergy removed successfully
 *       500:
 *         description: Failed to remove allergy
 */
router.delete('/:userId/:allergyId', authenticate, removeAllergyController);

/**
 * @swagger
 * /allergies/{userId}:
 *   get:
 *     summary: Get all allergies for a user
 *     tags: [Allergies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of allergies
 *       500:
 *         description: Failed to fetch allergies
 */
router.get('/:userId', authenticate, getAllergiesByUserIdController);

/**
 * @swagger
 * /allergies/{userId}/{allergyId}:
 *   put:
 *     summary: Update an allergy for a user
 *     tags: [Allergies]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: allergyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the allergy to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - allergyName
 *             properties:
 *               allergyName:
 *                 type: string
 *                 description: The new name of the allergy
 *     responses:
 *       200:
 *         description: Allergy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Bad request (missing required fields)
 *       404:
 *         description: Allergy not found or user not authorized
 *       500:
 *         description: Internal server error
 */
router.put('/:userId/:allergyId', authenticate, updateAllergyController);

export default router;
