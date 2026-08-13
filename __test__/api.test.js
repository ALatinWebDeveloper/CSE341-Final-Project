const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// 1. The Master Mock Database
jest.mock('../data/database', () => ({
    getDb: () => ({
        db: () => ({
            // We intercept the collection name dynamically
            collection: (collectionName) => {

                // Define the fake data for all 4 collections here
                const mockDatabase = {
                    products: [{ _id: '60b9b7362a2656461c83abdb', name: 'Laptop', price: 999 }],
                    categories: [{ _id: '60b9b7362a2656461c83abdc', name: 'Electronics' }],
                    orders: [{ _id: '60b9b7362a2656461c83abdd', status: 'Shipped', total: 999 }],
                    reviews: [{ _id: '60b9b7362a2656461c83abde', content: 'Great quality!' }]
                };

                // Return the data based on which collection the controller asked for
                return {
                    find: () => ({
                        toArray: async () => mockDatabase[collectionName] || []
                    }),
                    findOne: async () => (mockDatabase[collectionName] ? mockDatabase[collectionName][0] : null)
                };
            }
        })
    })
}));

// 2. Import all your controllers
const productsController = require('../controllers/products');
const categoriesController = require('../controllers/categories');
const ordersController = require('../controllers/orders');
const reviewsController = require('../controllers/reviews');

// 3. Attach all the routes
app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);

app.get('/categories', categoriesController.getAllCategorires);
app.get('/categories/:id', categoriesController.getCategoryById);

app.get('/orders', ordersController.getAllOrders);
app.get('/orders/:id', ordersController.getOrdersById);

app.get('/reviews', reviewsController.getAllReviews);
app.get('/reviews/:id', reviewsController.getReviewById);

// 4. Group your tests using 'describe' blocks
describe('E-commerce API GET Routes', () => {

    // --- PRODUCTS ---
    describe('Products', () => {
        test('GET /products', async () => {
            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe('Laptop');
        });
    });

    // --- CATEGORIES ---
    describe('Categories', () => {
        test('GET /categories', async () => {
            const response = await request(app).get('/categories');
            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe('Electronics');
        });
    });

    // --- ORDERS ---
    describe('Orders', () => {
        test('GET /orders', async () => {
            const response = await request(app).get('/orders');
            expect(response.status).toBe(200);
            expect(response.body[0].status).toBe('Shipped');
        });
    });

    // --- REVIEWS ---
    describe('Reviews', () => {
        test('GET /reviews', async () => {
            const response = await request(app).get('/reviews');
            expect(response.status).toBe(200);
            expect(response.body[0].content).toBe('Great quality!');
        });
    });

});