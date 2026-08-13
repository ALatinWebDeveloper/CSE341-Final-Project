const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.js');
const { validateReview } = require('../middleware/validations');
const validator = require('../helper/validator.js');
const requireAuth = require('../middleware/requireAuth');

router.get('/', reviewsController.getAllReviews);

router.get('/:id', reviewsController.getReviewById);

router.post('/', requireAuth, validateReview, reviewsController.createReview);

router.put('/:id', requireAuth, validateReview, reviewsController.updateReview);

router.delete('/:id', requireAuth, reviewsController.deleteReview);

module.exports = router;