import { validateRegistration, validateLogin } from '../utils/validation.js';
import { registerUser, loginUser, getUserProfile } from '../services/userService.js';

export const register = async (req, res) => {

    const { error } = validateRegistration(req.body);
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
    }

    try {
        await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.message === 'This username is already in use. Please try another username.') {
            return res.status(409).json({ error: error.message });
        }
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
        const token = await loginUser({ username, password });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await getUserProfile(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
        //console.log(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};