// filepath: c:\Users\kevin\OneDrive\Desktop\BE\utils\bcrypt.util.ts
import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
