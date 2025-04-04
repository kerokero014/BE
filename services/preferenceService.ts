import prisma from '../prisma/seed'; // Ensure the correct path to your Prisma instance
import { Prisma } from '@prisma/client';

export const addUserPreferencesService = async (
    userId: number,
    allergies: string[],
    dislikes: string[],
    favorites: string[],
) => {
    try {
        // Fetch all existing preferences in a single query per type
        const [existingAllergies, existingDislikes, existingFavorites] = await Promise.all([
            prisma.allergy.findMany({ where: { userId }, select: { name: true } }),
            prisma.dislike.findMany({ where: { userId }, select: { name: true } }),
            prisma.favoriteFood.findMany({ where: { userId }, select: { name: true } }),
        ]);

        // Convert existing preferences to sets for O(1) lookups
        const existingAllergySet = new Set(existingAllergies.map((a) => a.name));
        const existingDislikeSet = new Set(existingDislikes.map((d) => d.name));
        const existingFavoriteSet = new Set(existingFavorites.map((f) => f.name));

        // Filter new items to avoid duplicates
        const newAllergies = allergies.filter((a) => !existingAllergySet.has(a));
        const newDislikes = dislikes.filter((d) => !existingDislikeSet.has(d));
        const newFavorites = favorites.filter((f) => !existingFavoriteSet.has(f));

        // Prepare database operations
        const operations = [
            newAllergies.length > 0
                ? prisma.allergy.createMany({
                      data: newAllergies.map((name) => ({ name, userId })),
                      skipDuplicates: true,
                  })
                : null,
            newDislikes.length > 0
                ? prisma.dislike.createMany({
                      data: newDislikes.map((name) => ({ name, userId })),
                      skipDuplicates: true,
                  })
                : null,
            newFavorites.length > 0
                ? prisma.favoriteFood.createMany({
                      data: newFavorites.map((name) => ({ name, userId })),
                      skipDuplicates: true,
                  })
                : null,
        ].filter(Boolean) as Prisma.PrismaPromise<any>[];

        if (operations.length > 0) {
            await prisma.$transaction(operations);
        }

        return { allergies: newAllergies, dislikes: newDislikes, favorites: newFavorites };
    } catch (error) {
        console.error('Error adding user preferences:', error);
        throw new Error('Failed to save user preferences');
    }
};
