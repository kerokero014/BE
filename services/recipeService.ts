// services/recipeService.ts
import prisma from '../prisma/seed';

export const createRecipe = async (
    title: string,
    steps: { step: string; order: number }[], // Must have both steps'step' and 'order'
    nutritionalValue: string,
    description: string,
) => {
    return prisma.recipe.create({
        data: {
            title,
            description,
            nutritionalValue,
            steps: {
                // Create related RecipeStep records
                create: steps.map((step) => ({
                    step: step.step,
                    order: step.order,
                })),
            },
        },
    });
};

export const getAllRecipes = async () => {
    return prisma.recipe.findMany();
};

export const getRecipeById = async (id: number) => {
    return prisma.recipe.findUnique({
        where: { id },
        include: {
            steps: true,
            recipeIngredients: {
                include: {
                    ingredient: true,
                },
            },
            meals: true,
        },
    });
};

export const updateRecipe = async (
    id: number,
    title: string,
    steps: { step: string; order: number }[], // Expect steps with both 'step' and 'order'
    nutritionalValue: string,
    description: string,
) => {
    return prisma.recipe.update({
        where: { id },
        data: {
            title,
            description,
            nutritionalValue,
            steps: {
                deleteMany: {}, // Clear existing steps before updating
                create: steps.map((step) => ({
                    step: step.step,
                    order: step.order,
                })),
            },
        },
    });
};

export const deleteRecipe = async (id: number) => {
    return prisma.recipe.delete({
        where: { id },
    });
};
