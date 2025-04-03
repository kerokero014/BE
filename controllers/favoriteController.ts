import { Request, Response } from 'express';
import * as favoriteService from '../services/favoriteService';

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const favorites = await favoriteService.getFavorites(userId);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving favorite foods',
            error: (error as Error).message,
        });
    }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.body.userId, 10);
        const { name } = req.body;
        const favorite = await favoriteService.addFavorite(userId, name);
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding favorite food',
            error: (error as Error).message,
        });
    }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.body.userId, 10);
        const favoriteId = parseInt(req.params.favoriteId, 10);
        await favoriteService.removeFavorite(userId, favoriteId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error removing favorite food',
            error: (error as Error).message,
        });
    }
};

export const updateFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const favoriteId = parseInt(req.params.favoriteId, 10);
        const { newName } = req.body;
        const updatedFavorite = await favoriteService.updateFavorite(favoriteId, newName);
        res.json(updatedFavorite);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating favorite food',
            error: (error as Error).message,
        });
    }
};
