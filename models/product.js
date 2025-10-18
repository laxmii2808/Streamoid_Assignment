const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
},
name: {
    type: DataTypes.STRING,
    allowNull: false,
},
brand: {
    type: DataTypes.STRING,
    allowNull: false,
},
color: {
    type: DataTypes.STRING,
},
size: {
    type: DataTypes.STRING,
},
mrp: {
    type: DataTypes.FLOAT,
    allowNull: false,
},
price: {
    type: DataTypes.FLOAT,
    allowNull: false,
},
quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
});

module.exports = Product;