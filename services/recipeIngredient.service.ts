import {
    addIngredientToRecipe,
    removeIngredientFromRecipe,
    getIngredientsByRecipeId,
} from '../models/recipeIngredient.model';

export const addIngredientToRecipeService = async (
    recipeId: number,
    ingredientId: number,
    quantity: number,
    unit: string,
) => {
    return addIngredientToRecipe(recipeId, ingredientId, quantity, unit);
};

export const removeIngredientFromRecipeService = async (recipeId: number, ingredientId: number) => {
    return removeIngredientFromRecipe(recipeId, ingredientId);
};

export const getIngredientsByRecipeIdService = async (recipeId: number) => {
    return getIngredientsByRecipeId(recipeId);
};
