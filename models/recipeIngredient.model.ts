import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addIngredientToRecipe = async (
    recipeId: number,
    ingredientId: number,
    quantity: number,
    unit: string,
) => {
    return prisma.recipeIngredient.create({
        data: {
            recipeId,
            ingredientId,
            quantity,
            unit,
        },
    });
};

export const removeIngredientFromRecipe = async (recipeId: number, ingredientId: number) => {
    return prisma.recipeIngredient.deleteMany({
        where: {
            recipeId,
            ingredientId,
        },
    });
};

export const getIngredientsByRecipeId = async (recipeId: number) => {
    return prisma.recipeIngredient.findMany({
        where: { recipeId },
        include: { ingredient: true },
    });
};
