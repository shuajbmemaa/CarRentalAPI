import { db } from '../db/connection.js';
import { validateCarFilters, validateCreateCar } from '../utils/validation.js';

export const getRentalCars = async (req, res) => {
    try {
        const { error } = validateCarFilters(req.query);
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }

        const filter = {};
        const { year, color, steering_type, number_of_seats } = req.query;

        if (year) filter.year = parseInt(year);
        if (color) filter.color = color;
        if (steering_type) filter.steering_type = steering_type;
        if (number_of_seats) filter.number_of_seats = parseInt(number_of_seats);

        const cars = await db.collection('cars')
            .find(filter)
            .sort({ price_per_day: 1 })
            .toArray();

        if (cars.length === 0) {
            return res.status(404).json({ message: 'No cars found with the specified filters' });
        }

        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCar = async (req, res) => {
    try {
        const { error } = validateCreateCar(req.body);
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }

        const { name, price_per_day, year, color, steering_type, number_of_seats } = req.body;

        const newCar = {
            name,
            price_per_day,
            year,
            color,
            steering_type,
            number_of_seats
        };

        await db.collection('cars').insertOne(newCar);
        res.status(201).json({ message: 'Car added successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};