import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addDislike = async (userId: number, dislikeName: string) => {
    const existingDislike = await prisma.dislike.findFirst({
        where: {
            userId,
            name: dislikeName,
        },
    });

    if (existingDislike) {
        throw new Error('Dislike already exists for the user');
    }

    return prisma.dislike.create({
        data: {
            name: dislikeName,
            userId,
        },
    });
};

export const removeDislike = async (userId: number, dislikeId: number) => {
    return prisma.dislike.delete({
        where: {
            id: dislikeId,
            userId,
        },
    });
};

export const getDislikesByUserId = async (userId: number) => {
    return prisma.dislike.findMany({
        where: {
            userId,
        },
    });
};

export const updateDislike = async (userId: number, dislikeId: number, newName: string) => {
    return prisma.dislike.update({
        where: {
            id: dislikeId,
            userId, // Ensure the user owns the dislike
        },
        data: {
            name: newName,
        },
    });
};
