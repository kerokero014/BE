import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addAllergy = async (userId: number, allergyName: string) => {
    return prisma.allergy.create({
        data: {
            name: allergyName,
            userId,
        },
    });
};

export const removeAllergy = async (userId: number, allergyId: number) => {
    return prisma.allergy.delete({
        where: {
            id: allergyId,
            userId,
        },
    });
};

export const getAllergiesByUserId = async (userId: number) => {
    return prisma.allergy.findMany({
        where: {
            userId,
        },
    });
};

export const updateAllergy = async (userId: number, allergyId: number, newAllergyName: string) => {
    return prisma.allergy.update({
        where: {
            id: allergyId,
            userId,
        },
        data: {
            name: newAllergyName,
        },
    });
};
