const csv = require('csv-parser');
const { Readable } = require('stream');
const Product = require('../models/product');
const { Op } = require('sequelize');
exports.uploadProducts = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const validProducts = [];
  const failedRows = [];
  let rowIndex = 0;

  const stream = Readable.from(req.file.buffer.toString());

  stream
    .pipe(csv())
    .on('data', (row) => {
      rowIndex++;
      const { sku, name, brand, mrp, price, quantity } = row;
      const mrpFloat = parseFloat(mrp);
      const priceFloat = parseFloat(price);
      const quantityInt = parseInt(quantity, 10);
      if (!sku || !name || !brand || !mrp || !price) {
        failedRows.push({ row: rowIndex, reason: 'Missing required fields.' });
        return;
      }
      
      if (isNaN(mrpFloat) || isNaN(priceFloat) || priceFloat > mrpFloat) {
        failedRows.push({ row: rowIndex, sku, reason: 'Price cannot be greater than MRP.' });
        return;
      }

      if (isNaN(quantityInt) || quantityInt < 0) {
        failedRows.push({ row: rowIndex, sku, reason: 'Quantity must be non-negative.' });
        return;
      }

      validProducts.push({ ...row, mrp: mrpFloat, price: priceFloat, quantity: quantityInt });
    })
    .on('end', async () => {
      try {
        await Product.bulkCreate(validProducts, {
          updateOnDuplicate: ['name', 'brand', 'color', 'size', 'mrp', 'price', 'quantity']
        });
        res.status(200).json({ stored: validProducts.length, failed: failedRows });
      } catch (error) {
        res.status(500).json({ message: 'Error storing data.', error: error.message });
      }
    });
};
exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
    });
    res.status(200).json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      products: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products.', error: error.message });
  }
};
exports.searchProducts = async (req, res) => {
  const { brand, color, minPrice, maxPrice } = req.query;
  const whereClause = {};

  if (brand) whereClause.brand = { [Op.like]: `%${brand}%` }; // Case-insensitive search
  if (color) whereClause.color = { [Op.like]: `%${color}%` };
  
  if (minPrice || maxPrice) {
    whereClause.price = {};
    if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
    if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
  }

  try {
    const products = await Product.findAll({ where: whereClause });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products.', error: error.message });
  }
};