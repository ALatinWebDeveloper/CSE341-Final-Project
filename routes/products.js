const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.js');
const { validateProduct } = require('../middleware/validations');
const validator = require('../helper/validator.js');
const requireAuth = require('../middleware/requireAuth');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', requireAuth, validateProduct, productsController.createProduct);

router.put('/:id', requireAuth, validateProduct, productsController.updateProduct);

router.delete('/:id', requireAuth, productsController.deleteProduct);

module.exports = router;