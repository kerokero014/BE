import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email },
    });
};

export const createUser = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}) => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) throw new Error('Email already in use');

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    return prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
        },
    });
};

export const findUnique = async (id: number) => prisma.user.findUnique({ where: { id } });

export const deleteUser = async (id: number) => prisma.user.delete({ where: { id } });

export const updateUser = async (id: number, data: Partial<User>) =>
    prisma.user.update({ where: { id }, data });
