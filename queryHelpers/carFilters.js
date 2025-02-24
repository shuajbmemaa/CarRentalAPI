export const extractCarFilters = (filters) => {
    const filterConditions = {};

    const { year, color, steering_type, number_of_seats } = filters;

    if (year) filterConditions.year = parseInt(year);
    if (color) filterConditions.color = color;
    if (steering_type) filterConditions.steering_type = steering_type;
    if (number_of_seats) filterConditions.number_of_seats = parseInt(number_of_seats);

    return filterConditions;
};