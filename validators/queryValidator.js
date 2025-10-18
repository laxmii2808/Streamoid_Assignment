const validateQueryParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: 'Invalid query parameters', details: error.details.map(d => d.message) });
  }
  next();
};
module.exports = { validateQueryParams };