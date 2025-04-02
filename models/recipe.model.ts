import prisma from '../prisma/seed';

export const createRecipe = async (
    title: string,
    instructions: string,
    nutritionalValue: string,
    description: string,
) => {
    return prisma.recipe.create({
        data: { title, instructions, nutritionalValue, description },
    });
};

export const getAllRecipes = async () => {
    return prisma.recipe.findMany();
};

export const getRecipeById = async (id: number) => {
    return prisma.recipe.findUnique({
        where: { id },
    });
};

export const updateRecipe = async (
    id: number,
    title: string,
    instructions: string,
    nutritionalValue: string,
    description: string,
) => {
    return prisma.recipe.update({
        where: { id },
        data: { title, instructions, nutritionalValue, description },
    });
};

export const deleteRecipe = async (id: number) => {
    return prisma.recipe.delete({
        where: { id },
    });
};
