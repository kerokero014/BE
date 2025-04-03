import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
    getFavorites,
    addFavorite,
    removeFavorite,
    updateFavorite,
} from '../controllers/favoriteController';

const router = express.Router();

/**
 * @swagger
 * /favorites/{userId}:
 *   get:
 *     summary: Get all favorite foods for a user
 *     tags: [Favorite Foods]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of favorite foods
 *       500:
 *         description: Failed to fetch favorite foods
 */
router.get('/:userId', authenticate, getFavorites);

/**
 * @swagger
 * /favorites/{userId}:
 *   post:
 *     summary: Add a new favorite food
 *     tags: [Favorite Foods]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the favorite food
 *     responses:
 *       201:
 *         description: Favorite food added successfully
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal server error
 */
router.post('/:userId', authenticate, addFavorite);

/**
 * @swagger
 * /favorites/{userId}/{favoriteId}:
 *   delete:
 *     summary: Remove a favorite food
 *     tags: [Favorite Foods]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: favoriteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite food removed successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:userId/:favoriteId', authenticate, removeFavorite);

/**
 * @swagger
 * /favorites/{favoriteId}:
 *   put:
 *     summary: Update a favorite food
 *     tags: [Favorite Foods]
 *     parameters:
 *       - in: path
 *         name: favoriteId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the favorite food
 *     responses:
 *       200:
 *         description: Favorite food updated successfully
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal server error
 */
router.put('/:favoriteId', authenticate, updateFavorite);

export default router;
