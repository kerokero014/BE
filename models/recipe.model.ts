import prisma from '../prisma/seed';

//TODO: fix recipe models to accept steps
export const createRecipe = async (
    title: string,
    description: string,
    nutritionalValue: string,
    steps: { step: string; order: number }[], // Expecting steps with both 'step' and 'order'
) => {
    return prisma.recipe.create({
        data: {
            title,
            description,
            nutritionalValue,
            steps: {
                create: steps.map((step) => ({
                    step: step.step,
                    order: step.order,
                })),
            },
        },
        include: {
            steps: true, // Include the created steps in the response
        },
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
    description: string,
    nutritionalValue: string,
    steps: { step: string; order: number }[],
) => {
    return prisma.recipe.update({
        where: { id },
        data: {
            title,
            description,
            nutritionalValue,
            steps: {
                deleteMany: {}, // Delete existing steps before updating
                create: steps.map((step) => ({
                    step: step.step,
                    order: step.order,
                })),
            },
        },
        include: {
            steps: true, // Include the updated steps in the response
        },
    });
};

export const deleteRecipe = async (id: number) => {
    return prisma.recipe.delete({
        where: { id },
    });
};
