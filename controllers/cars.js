import { validateCarFilters, validateCreateCar } from '../utils/validation.js';
import { getCars, insertCar, deleteCar } from '../services/carService.js';
import { ObjectId } from 'mongodb';

export const getRentalCars = async (req, res) => {
    try {

        const { error } = validateCarFilters(req.query);
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }

        const cars = await getCars(req.query);

        if (cars.length === 0) {
            return res.status(404).json({ message: 'No cars found with the specified filters' });
        }

        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCar = async (req, res) => {

    const { error } = validateCreateCar(req.body);
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
    }

    try {
        await insertCar(req.body);
        res.status(201).json({ message: 'Car added successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCarById = async (req, res) => {

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Car id is required' });
        }
        const objectId = new ObjectId(id);

        await deleteCar(objectId);
        res.status(201).json({ message: 'Car deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};