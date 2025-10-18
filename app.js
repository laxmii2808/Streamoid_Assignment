const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/', productRoutes);
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = app;