import * as favoriteModel from '../models/favorite.model';

export const getFavorites = async (userId: number) => {
    return favoriteModel.getFavoritesByUserId(userId);
};

export const addFavorite = async (userId: number, name: string) => {
    // Check if the favorite food already exists for the user
    const existingFavorite = await favoriteModel.getFavoritesByUserId(userId);
    if (existingFavorite.some((fav) => fav.name.toLowerCase() === name.toLowerCase())) {
        throw new Error('Favorite food already exists');
    }

    return favoriteModel.addFavoriteFood(userId, name);
};

export const removeFavorite = async (userId: number, favoriteId: number) => {
    return favoriteModel.removeFavoriteFood(userId, favoriteId);
};

export const updateFavorite = async (favoriteId: number, newName: string) => {
    return favoriteModel.updateFavoriteFood(favoriteId, newName);
};
