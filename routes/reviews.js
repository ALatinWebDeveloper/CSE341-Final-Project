const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.js');
const { validateReview } = require('../middleware/validations');

router.get('/', reviewsController.getAllReviews);

router.get('/:id', reviewsController.getReviewById);

router.post('/', validateReview, reviewsController.createReview);

router.put('/:id', validateReview, reviewsController.updateReview);

router.delete('/:id', reviewsController.deleteReview);

module.exports = router;