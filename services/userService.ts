import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { CreateUserSchema } from '../validators/user.validator';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return prisma.user.findMany({
        include: {
            allergies: true,
            dislikes: true,
            favoriteFoods: true,
            savedRecipes: true,
        },
    });
};

export const createUser = async (userData: any) => {
    const parsedData = CreateUserSchema.parse(userData);
    const hashedPassword = await hash(parsedData.password, 10);

    return prisma.user.create({
        data: {
            email: parsedData.email,
            passwordHash: hashedPassword,
            firstName: parsedData.firstName,
            lastName: parsedData.lastName,
            weightGoal: parsedData.weightGoal,
        },
    });
};

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            allergies: true,
            dislikes: true,
            favoriteFoods: true,
            savedRecipes: true,
        },
    });
};

export const updateUser = async (id: number, updateData: any) => {
    return prisma.user.update({
        where: { id },
        data: updateData,
    });
};

export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};
