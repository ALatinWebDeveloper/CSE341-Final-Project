const validator = require('../helper/validator');

const validateProduct = (req, res, next) => {

    const dataValidation = {
        name: 'required|string',
        description: 'required|string',
        price: 'required|numeric',
        category: 'required|string',
        quantity: 'required|integer',
        manufacturer: 'required|string',
    }

    validator(req.body, dataValidation, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                message: 'Invalid input',
                data: err
            });
        } else {
            next();
        }
    });
}

const validateCategory = (req, res, next) => {

    const dataValidation = {
        name: 'required|string',
        description: 'required|string'
    };

    validator(req.body, dataValidation, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                message: 'Invalid input',
                data: err
            });
        } else {
            next();
        }
    });
}

const validateOrder = (req, res, next) => {

    const dataValidation = {
        orderDate: 'required|string',
        totalAmount: 'required|numeric',
        status: 'required|string'
    };

    validator(req.body, dataValidation, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                message: 'Invalid input',
                data: err
            });
        } else {
            next();
        }
    });
}

const validateReview = (req, res, next) => {

    const dataValidation = {
        name: 'required|string',
        review: 'required|string'
    };

    validator(req.body, dataValidation, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                message: 'Invalid input',
                data: err
            });
        } else {
            next();
        }
    });
}

module.exports = { validateProduct, validateCategory, validateOrder, validateReview };