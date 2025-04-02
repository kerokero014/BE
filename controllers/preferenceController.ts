import { Request, Response } from 'express';
import { addUserPreferencesService } from '../services/preferenceService';

export const addUserPreferencesController = async (req: Request, res: Response) => {
    try {
        const { userId, allergies = [], dislikes = [], favorites = [] } = req.body;

        // Call the service function to save all preferences at once
        const preferences = await addUserPreferencesService(userId, allergies, dislikes, favorites);

        res.status(201).json({ message: 'Preferences saved successfully', preferences });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Failed to save preferences' });
    }
};
