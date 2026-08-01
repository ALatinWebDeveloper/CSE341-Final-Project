const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productsDB = await mongodb.getDb().db().collection('products').find();

        if (!productsDB) {
            res.status(404).json({ message: 'No products storaged' });
            return;
        }

        productsDB.toArray().then((productsDB) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(productsDB);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProductById = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const productsDB = await mongodb.getDb().db().collection('products').find({ _id: productId });

        if (!productsDB) {
            res.status(404).json({ message: 'No product found with this ID' });
            return;
        }

        productsDB.toArray().then((productsDB) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(productsDB);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            manufacturer: req.body.manufacturer
        };

        const response = await mongodb.getDb().db().collection('products').insertOne(newProduct);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const updateProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            manufacturer: req.body.manufacturer
        }
        const productsDB = await mongodb.getDb().db().collection('products').find({ _id: productId });

        if (response.matchedCount === 0) {
            res.status(404).json({ message: 'No product found with this ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }
        const ProductId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('products').deleteOne({ _id: ProductId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'Invalid ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };