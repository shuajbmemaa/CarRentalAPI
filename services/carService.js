import { genericRepository } from '../repositories/genericRepository.js';

const COLLECTION = 'cars';

export const getCars = async (filters) => {
    const filterConditions = {};

    const { year, color, steering_type, number_of_seats } = filters;

    if (year) filterConditions.year = parseInt(year);
    if (color) filterConditions.color = color;
    if (steering_type) filterConditions.steering_type = steering_type;
    if (number_of_seats) filterConditions.number_of_seats = parseInt(number_of_seats);

    return await genericRepository.findAll(COLLECTION, filterConditions, { price_per_day: 1 });
};

export const insertCar = async (carData) => {
    return await genericRepository.create(COLLECTION, carData);
};

export const deleteCar = async (id) => {
    return await genericRepository.deleteById(COLLECTION, id)
}
