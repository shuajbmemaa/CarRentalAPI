import { genericRepository } from '../repositories/genericRepository.js';
import { extractCarFilters } from '../queryHelpers/carFilters.js'

const COLLECTION = 'cars';

export const getCars = async (filters) => {
    const filterConditions = extractCarFilters(filters);
    return await genericRepository.findAll(COLLECTION, filterConditions, { price_per_day: 1 });
};

export const insertCar = async (carData) => {
    return await genericRepository.create(COLLECTION, carData);
};

export const deleteCar = async (id) => {
    return await genericRepository.deleteById(COLLECTION, id)
}
