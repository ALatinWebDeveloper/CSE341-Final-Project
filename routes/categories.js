const express = require('express');
const router = express.Router();

const categoriesControllers = require('../controllers/categories');
const { validateCategory } = require('../middleware/validations');
const validator = require('../helper/validator.js');
const requireAuth = require('../middleware/requireAuth');

router.get('/', categoriesControllers.getAllCategorires);

router.get('/:id', categoriesControllers.getCategoryById);

router.post('/', requireAuth, validateCategory, categoriesControllers.createCategory);

router.put('/:id', requireAuth, validateCategory, categoriesControllers.updateCategory);

router.delete('/:id', requireAuth, categoriesControllers.deleteCategory);

module.exports = router;