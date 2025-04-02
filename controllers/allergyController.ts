import { Request, Response } from 'express';
import { addAllergyService, removeAllergyService, getAllergiesByUserIdService } from '../services/allergyService';

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
