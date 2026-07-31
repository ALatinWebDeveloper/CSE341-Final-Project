const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.js');
const productValidation = require('../middleware/validations.js');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productValidation, productsController.createProduct);

router.put('/:id', productValidation, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;