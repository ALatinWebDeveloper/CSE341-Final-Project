const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllReviews = async (req, res) => {
    //#swagger.tags = ['Reviews']
    try {
        const reviewsDB = await mongodb.getDb().db().collection('reviews').find();

        if (!reviewsDB) {
            res.status(404).json({ message: 'No reviews found' });
            return;
        }

        reviewsDB.toArray().then((reviewsDB) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(reviewsDB);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getReviewById = async (req, res) => {
    //#swagger.tags = ['Reviews']
    try {
        const reviewId = new ObjectId(req.params.id);
        const reviewsDB = await mongodb.getDb().db().collection('reviews').find({ _id: reviewId });

        if (!reviewsDB) {
            return res.status(404).json({ message: 'No review found with this ID' });
        }

        reviewsDB.toArray().then((reviewsDB) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(reviewsDB);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createReview = async (req, res) => {
    //#swagger.tags = ['Reviews']
    /*  #swagger.security = [{
            "bearerAuth": []
        }] 
    */
    try {
        const newReview = {
            name: req.body.name,
            review: req.body.review
        };

        const response = await mongodb.getDb().db().collection('reviews').insertOne(newReview);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateReview = async (req, res) => {
    //#swagger.tags = ['Reviews']
    /*  #swagger.security = [{
            "bearerAuth": []
        }] 
    */
    try {
        const reviewId = new ObjectId(req.params.id);
        const updateReview = {
            name: req.body.name,
            review: req.body.review
        }
        const response = await mongodb.getDb().db().collection('reviews').updateOne({ _id: reviewId }, { $set: updateReview });

        if (response.matchedCount === 0) {
            res.status(404).json({ message: 'No review found with this ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteReview = async (req, res) => {
    //#swagger.tags = ['Reviews']
    /*  #swagger.security = [{
            "bearerAuth": []
        }] 
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Invalid review ID' });
            return;
        }
        const ReviewId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('reviews').deleteOne({ _id: ReviewId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'Invalid ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAllReviews, getReviewById, createReview, updateReview, deleteReview };