import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const addIngredient = async (
    name: string,
    nutritionalValue: string,
    quantity: number,
    unit: string,
) => {
    return prisma.ingredient.create({
        data: {
            name,
            nutritionalValue,
            quantity: new Prisma.Decimal(quantity),
            unit,
        },
    });
};

export const getAllIngredients = async () => {
    return prisma.ingredient.findMany();
};

export const getIngredientById = async (ingredientId: number) => {
    return prisma.ingredient.findUnique({
        where: { id: ingredientId },
    });
};