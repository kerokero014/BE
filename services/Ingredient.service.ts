import prisma from '../prisma/seed';

export const addIngredientService = async (
    name: string,
    nutritionalValue: string,
    quantity: number,
    unit: string,
) => {
    return prisma.ingredient.create({
        data: { name, nutritionalValue, quantity, unit },
    });
};

export const getAllIngredientsService = async () => {
    return prisma.ingredient.findMany();
};

export const getIngredientByIdService = async (id: number) => {
    return prisma.ingredient.findUnique({
        where: { id },
    });
};
