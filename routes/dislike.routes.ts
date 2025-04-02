import express from 'express';
import {
    addDislikeController,
    removeDislikeController,
    getDislikesByUserIdController,
    updateDislikeController,
} from '../controllers/dislikeController';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /dislikes:
 *   post:
 *     summary: Add a new dislike for a user
 *     tags: [Dislikes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               dislikeName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dislike added successfully
 *       500:
 *         description: Failed to add dislike
 */
router.post('/', authenticate, addDislikeController);

/**
 * @swagger
 * /dislikes/{userId}/{dislikeId}:
 *   delete:
 *     summary: Remove a dislike for a user
 *     tags: [Dislikes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: dislikeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Dislike removed successfully
 *       500:
 *         description: Failed to remove dislike
 */
router.delete('/:userId/:dislikeId', authenticate, removeDislikeController);

/**
 * @swagger
 * /dislikes/{userId}:
 *   get:
 *     summary: Get all dislikes for a user
 *     tags: [Dislikes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of dislikes
 *       500:
 *         description: Failed to fetch dislikes
 */
router.get('/:userId', authenticate, getDislikesByUserIdController);

/**
 * @swagger
 * /dislikes/{userId}/{dislikeId}:
 *   put:
 *     summary: Update a dislike for a user
 *     tags: [Dislikes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: dislikeId
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dislikeName:
 *                 type: string
 *           example:
 *             dislikeName: "Updated Dislike Name"
 *     responses:
 *       200:
 *         description: Dislike updated successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Dislike not found
 *       500:
 *         description: Failed to update dislike
 */
router.put('/:userId/:dislikeId', authenticate, updateDislikeController);

export default router;
