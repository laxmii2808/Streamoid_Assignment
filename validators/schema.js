const Joi = require('joi');

const listSchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional()
});
const searchSchema = Joi.object({
    brand: Joi.string().optional(),
    color: Joi.string().optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional()
});

module.exports = { listSchema, searchSchema };