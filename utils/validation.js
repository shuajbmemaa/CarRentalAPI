import Joi from 'joi';

export const validateRegistration = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data, { abortEarly: false });
};

export const validateLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(data, { abortEarly: false });
};

export const validateCarFilters = (data) => {
    const schema = Joi.object({
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
        color: Joi.string(),
        steering_type: Joi.string().valid('automatic', 'manual'),
        number_of_seats: Joi.number().integer().min(1).max(10)
    });

    return schema.validate(data, { abortEarly: false });
};

export const validateCreateCar = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price_per_day: Joi.number().positive().required(),
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        color: Joi.string().required(),
        steering_type: Joi.string().valid('automatic', 'manual').required(),
        number_of_seats: Joi.number().integer().min(1).max(10).required()
    });

    return schema.validate(data, { abortEarly: false });
};