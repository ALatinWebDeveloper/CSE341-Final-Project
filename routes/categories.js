const express = require('express');
const router = express.Router();
const categoriesControllers = require('../controllers/categories');
const { validateCategory } = require('../middleware/validations');

router.get('/', categoriesControllers.getAllCategorires);

router.get('/:id', categoriesControllers.getCategoryById);

router.post('/', validateCategory, categoriesControllers.createCategory);

router.put('/:id', validateCategory, categoriesControllers.updateCategory);

router.delete('/:id', categoriesControllers.deleteCategory);

module.exports = router;