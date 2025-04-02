import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFavoritesByUserId = async (userId: number) => {
    return prisma.favoriteFood.findMany({
        where: { userId },
    });
};

export const addFavoriteFood = async (userId: number, name: string) => {
    return prisma.favoriteFood.create({
        data: {
            name,
            userId,
        },
    });
};

export const removeFavoriteFood = async (userId: number, favoriteId: number) => {
    return prisma.favoriteFood.delete({
        where: {
            id: favoriteId,
            userId,
        },
    });
};

export const updateFavoriteFood = async (favoriteId: number, newName: string) => {
    return prisma.favoriteFood.update({
        where: { id: favoriteId },
        data: { name: newName },
    });
};
