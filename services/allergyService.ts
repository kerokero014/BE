import {
    addAllergy,
    removeAllergy,
    getAllergiesByUserId,
    updateAllergy,
} from '../models/allergy.model';

export const addAllergyService = async (userId: number, allergyName: string) => {
    // Check if allergy already exists for the user
    const existingAllergy = await getAllergiesByUserId(userId);
    if (existingAllergy.some((allergy) => allergy.name === allergyName)) {
        throw new Error('Allergy already exists for the user');
    }

    return addAllergy(userId, allergyName);
};

export const removeAllergyService = async (userId: number, allergyId: number) => {
    return removeAllergy(userId, allergyId);
};

export const getAllergiesByUserIdService = async (userId: number) => {
    return getAllergiesByUserId(userId);
};

export const updateAllergyService = async (
    userId: number,
    allergyId: number,
    newAllergyName: string,
) => {
    return updateAllergy(userId, allergyId, newAllergyName);
};
