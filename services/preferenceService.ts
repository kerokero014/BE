import prisma from '../prisma/seed'; // Ensure you have the correct path to your prisma instance
import { getDislikesByUserId } from '../models/dislike.model';
import { getAllergiesByUserId } from '../models/allergy.model';
import { getFavoritesByUserId } from '../models/favorite.model';

export const addUserPreferencesService = async (
    userId: number,
    allergies: string[],
    dislikes: string[],
    favorites: string[],
) => {
    // Insert allergies (avoid duplicates)
    if (allergies.length) {
        const existingAllergies = await getAllergiesByUserId(userId);
        const newAllergies = allergies.filter(
            (a) => !existingAllergies.some((ea) => ea.name === a),
        );

        if (newAllergies.length) {
            await prisma.allergy.createMany({
                data: newAllergies.map((name) => ({ name, userId })),
                skipDuplicates: true, // Avoid duplicate entries
            });
        }
    }

    // Insert dislikes (avoid duplicates)
    if (dislikes.length) {
        const existingDislikes = await getDislikesByUserId(userId);
        const newDislikes = dislikes.filter((d) => !existingDislikes.some((ed) => ed.name === d));

        if (newDislikes.length) {
            await prisma.dislike.createMany({
                data: newDislikes.map((name) => ({ name, userId })),
                skipDuplicates: true,
            });
        }
    }

    // Insert favorite foods (avoid duplicates)
    if (favorites.length) {
        const existingFavorites = await getFavoritesByUserId(userId);
        const newFavorites = favorites.filter(
            (f) => !existingFavorites.some((ef) => ef.name === f),
        );

        if (newFavorites.length) {
            await prisma.favoriteFood.createMany({
                data: newFavorites.map((name) => ({ name, userId })),
                skipDuplicates: true,
            });
        }
    }

    return { allergies, dislikes, favorites };
};
