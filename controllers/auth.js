import { db } from '../db/rent.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { validateRegistration, validateLogin } from '../utils/validation.js';

export const register = async (req, res) => {

    const { error } = validateRegistration(req.body);
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
    }

    try {
        const { fullName, email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection('users').insertOne({
            fullName,
            email,
            username,
            password: hashedPassword,
            createdAt: new Date()
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {

    const { error } = validateLogin(req.body);
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
    }

    try {
        const { username, password } = req.body;

        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {

        const user = await db.collection('users').findOne(
            { _id: new ObjectId(req.userId) },
            {
                projection: {
                    fullName: 1,
                    email: 1,
                    username: 1
                }
            }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
        //console.log(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};