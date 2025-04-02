import { Request, Response } from 'express';
import {
    addDislikeService,
    removeDislikeService,
    getDislikesByUserIdService,
    updatedDislikeService,
} from '../services/dislikes.service';

export const addDislikeController = async (req: Request, res: Response) => {
    try {
        const { userId, dislikeName } = req.body;
        const dislike = await addDislikeService(userId, dislikeName);
        res.status(201).json(dislike);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add dislike' });
    }
};

export const removeDislikeController = async (req: Request, res: Response) => {
    try {
        const { userId, dislikeId } = req.params;
        await removeDislikeService(Number(userId), Number(dislikeId));
        res.json({ message: 'Dislike removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove dislike' });
    }
};

export const getDislikesByUserIdController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const dislikes = await getDislikesByUserIdService(userId);
        res.json(dislikes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dislikes' });
    }
};

export const updateDislikeController = async (req: Request, res: Response) => {
    try {
        const { userId, dislikeId } = req.params;
        const { newDislikeName } = req.body;
        const updatedDislike = await updatedDislikeService(
            Number(userId),
            Number(dislikeId),
            newDislikeName,
        );
        res.json(updatedDislike);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update dislike' });
    }
};
