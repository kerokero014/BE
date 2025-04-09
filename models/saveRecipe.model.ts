import prisma from '../prisma/seed';

export const saveRecipeForUser = async (userId: number, recipeId: number) => {
    return prisma.savedRecipe.create({
        data: {
            userId,
            recipeId,
        },
    });
};

export const getSavedRecipesForUser = async (userId: number) => {
    return prisma.savedRecipe.findMany({
        where: { userId },
        include: { 
            recipe: {
                include: { steps: true },
            }
        },
    });
};

