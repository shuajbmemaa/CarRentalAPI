import express from 'express';
import { getRentalCars } from '../controllers/cars.js';
import { createCar } from '../controllers/cars.js'

const router = express.Router();

router.get('/rental-cars', getRentalCars);
router.post('/insertCar', createCar);

export default router;