const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');
const { validateQueryParams } = require('../validators/queryValidator');
const { listSchema, searchSchema } = require('../validators/schema');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), productController.uploadProducts);
router.get('/products', validateQueryParams(listSchema), productController.getAllProducts);
router.get('/products/search', validateQueryParams(searchSchema), productController.searchProducts);

module.exports = router;