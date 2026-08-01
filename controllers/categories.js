const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCategorires = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const categoriesDB = await mongodb.getDb().db().collection('categories').find();

        if (!categoriesDB) {
            return res.status(404).json({ message: 'No category found' });
        }

        categoriesDB.toArray().then((categoriesDB) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(categoriesDB);
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCategoryById = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const categoryId = new ObjectId(req.params.id);
        const categoriesDB = await mongodb.getDb().db().collection('categories').find({ _id: ObjectId });

        if (!categoriesDB) {
            res.status(404).json({ message: 'No category found with this ID' });
        }
        categoriesDB.toArray().then((categoriesDB) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ categoriesDB });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createCategory = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const newCategory = {
            name: req.body.name,
            description: req.body.description
        };

        const response = await mongodb.getDb().db().collection('categories').insertOne({ newCategory });

        if (response.acknowledged) {
            res.status(201).json(response);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCategory = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const categorytId = new ObjectId(req.params.id);

        const updateCategory = {
            name: req.body.name,
            description: req.body.description
        }
        const response = await mongodb.getDb().db().collection('categories').find({ _id: categorytId });

        if (response.matchedCount === 0) {
            res.status(404).json({ message: 'No categoryt found with this ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCategory = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Invalid category ID' });
            return;
        }
        const categorytId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('categories').deleteOne({ _id: categorytId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'Invalid ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAllCategorires, getCategoryById, createCategory, updateCategory, deleteCategory };