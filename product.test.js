const request = require('supertest');
const app = require('./app'); 
const sequelize = require('./config/database'); 
const Product = require('./models/product'); 
beforeAll(async () => {
    await sequelize.sync({ force: true });
});
describe('Product API', () => {
    describe('POST /upload', () => {
        beforeEach(async () => {
            await Product.destroy({ where: {}, truncate: true });
        });

        it('should correctly parse a valid CSV and store the product', async () => {
            const validCsv = 'sku,name,brand,mrp,price,quantity\nTEST-SKU-01,Valid Tee,TestBrand,500,400,10';

            const response = await request(app)
                .post('/upload')
                .attach('file', Buffer.from(validCsv), 'products.csv') // Attaching the CSV content as a file
                .expect(200);
            expect(response.body.stored).toBe(1);
            expect(response.body.failed).toHaveLength(0);
            const product = await Product.findByPk('TEST-SKU-01');
            expect(product).not.toBeNull();
            expect(product.name).toBe('Valid Tee');
        });

        it('should reject a row if price is greater than mrp', async () => {
            const invalidPriceCsv = 'sku,name,brand,mrp,price,quantity\nTEST-SKU-02,Bad Price Tee,TestBrand,500,600,10';

            const response = await request(app)
                .post('/upload')
                .attach('file', Buffer.from(invalidPriceCsv), 'products.csv')
                .expect(200);

            expect(response.body.stored).toBe(0);
            expect(response.body.failed).toHaveLength(1);
            expect(response.body.failed[0].reason).toContain('Price cannot be greater than MRP');
        });

        it('should reject a row if a required field like "brand" is missing', async () => {
            const missingFieldCsv = 'sku,name,mrp,price,quantity\nTEST-SKU-03,No Brand Tee,500,400,10';

            const response = await request(app)
                .post('/upload')
                .attach('file', Buffer.from(missingFieldCsv), 'products.csv')
                .expect(200);

            expect(response.body.stored).toBe(0);
            expect(response.body.failed).toHaveLength(1);
            expect(response.body.failed[0].reason).toContain('Missing required fields');
        });
    });
    describe('GET /products/search', () => {
            beforeAll(async () => {
            await Product.bulkCreate([
                { sku: 'DNM-01', name: 'Slim Fit Jeans', brand: 'DenimWorks', color: 'Blue', price: 1599, mrp: 1999, quantity: 15 },
                { sku: 'DNM-02', name: 'Slim Fit Jeans', brand: 'DenimWorks', color: 'Black', price: 1499, mrp: 1999, quantity: 18 },
                { sku: 'BLM-01', name: 'Floral Summer Dress', brand: 'BloomWear', color: 'Pink', price: 2199, mrp: 2499, quantity: 10 }
            ]);
        });

        it('should filter products by brand', async () => {
            const response = await request(app)
                .get('/products/search?brand=DenimWorks')
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body.every(p => p.brand === 'DenimWorks')).toBe(true);
        });

        it('should filter products by price range', async () => {
            const response = await request(app)
                .get('/products/search?minPrice=2000&maxPrice=2500')
                .expect(200);

            expect(response.body).toHaveLength(1); 
            expect(response.body[0].sku).toBe('BLM-01');
        });

        it('should return an empty array for a search with no matches', async () => {
            const response = await request(app)
                .get('/products/search?brand=NoSuchBrand')
                .expect(200);

            expect(response.body).toHaveLength(0);
        });
    });
});
afterAll(async () => {
    await sequelize.close();
});