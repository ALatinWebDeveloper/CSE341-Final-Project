const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.js');
const { validateProduct } = require('../middleware/validations');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', validateProduct, productsController.createProduct);

router.put('/:id', validateProduct, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;