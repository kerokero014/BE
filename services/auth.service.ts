import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/user.model';
import env from '../config/env';

export const registerUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error('Email already in use');

    return createUser({ email, password, firstName, lastName });
};
export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: '7d' });

    return { token, user };
};
