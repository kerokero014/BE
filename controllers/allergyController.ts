import { Request, Response } from 'express';
import {
    addAllergyService,
    removeAllergyService,
    getAllergiesByUserIdService,
    updateAllergyService,
} from '../services/allergyService';

export const addAllergyController = async (req: Request, res: Response) => {
    try {
        const { userId, allergyName } = req.body;
        const allergy = await addAllergyService(userId, allergyName);
        res.status(201).json(allergy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add allergy' });
    }
};

export const removeAllergyController = async (req: Request, res: Response) => {
    try {
        const { userId, allergyId } = req.params;
        await removeAllergyService(Number(userId), Number(allergyId));
        res.json({ message: 'Allergy removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove allergy' });
    }
};

export const getAllergiesByUserIdController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const allergies = await getAllergiesByUserIdService(userId);
        res.json(allergies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch allergies' });
    }
};

export const updateAllergyController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.userId);
        const allergyId = Number(req.params.allergyId);
        const { allergyName } = req.body;

        if (!allergyName) {
            res.status(400).json({ error: 'Allergy name is required' });
            return;
        }

        const updatedAllergy = await updateAllergyService(userId, allergyId, allergyName);

        if (!updatedAllergy) {
            res.status(404).json({ error: 'Allergy not found or user not authorized' });
            return;
        }

        res.json(updatedAllergy);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Failed to update allergy' });
    }
};
