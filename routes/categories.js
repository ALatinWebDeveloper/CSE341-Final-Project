const express = require('express');
const router = express.Router();
const categoriesControllers = require('../controllers/categories');
const { validateCategory } = require('../middleware/validations');

router.get('/', categoriesControllers.getAllCategorires);

router.get('/', categoriesControllers.getCategoryById);

router.post('/', validateCategory, categoriesControllers.createCategory);

router.put('/', validateCategory, categoriesControllers.updateCategory);

router.delete('/', categoriesControllers.deleteCategory);

module.exports = router;