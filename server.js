const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
sequelize.sync().then(() => {
    console.log('Database connected and synchronized.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});