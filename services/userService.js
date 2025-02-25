import bcrypt from 'bcryptjs';
import { genericRepository } from '../repositories/genericRepository.js';
import { generateToken } from '../utils/authHelper.js';

const COLLECTION = 'users';

export const registerUser = async ({ fullName, email, username, password }) => {
    const existingUser = await genericRepository.findOne(COLLECTION, { username });

    if (existingUser) {
        throw new Error("This username is already in use. Please try another username.")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await genericRepository.create(COLLECTION, { fullName, email, username, password: hashedPassword });
};

export const loginUser = async ({ username, password }) => {
    const user = await genericRepository.findOne(COLLECTION, { username });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return generateToken(user._id);
};

export const getUserProfile = async (userId) => {
    const projection = {
        fullName: 1,
        email: 1,
        username: 1
    };
    const user = await genericRepository.findById(COLLECTION, userId, projection);
    if (!user) throw new Error('User not found');
    return user;
};
