import express from 'express';
import { getRentalCars, createCar, deleteCarById } from '../controllers/cars.js'

const router = express.Router();

router.get('/rental-cars', getRentalCars);
router.post('/insertCar', createCar);
router.delete('/deleteCar/:id', deleteCarById)

export default router;