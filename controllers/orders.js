const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllOrders = async (req, res) => {
    //#swagger.tags = ['Orders']
    try {
        const ordersDB = await mongodb.getDb().db().collection('orders').find();

        if (!ordersDB) {
            return res.status(404).json({ message: 'No order found' });
        }

        ordersDB.toArray().then((ordersDB) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(ordersDB);
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrdersById = async (req, res) => {
    //#swagger.tags = ['Orders']
    try {
        const orderId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('orders').findOne({ _id: orderId });

        if (!result) {
            return res.status(404).json({ message: 'No order found with this ID' });
        }
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createOrder = async (req, res) => {
    //#swagger.tags = ['Orders']
    try {
        const newOrder = {
            userId: req.body.userId,
            orderDate: req.body.orderDate,
            totalAmount: req.body.totalAmount,
            status: req.body.status,
            items: req.body.items
        };

        const response = await mongodb.getDb().db().collection('orders').insertOne(newOrder);

        if (response.acknowledged) {
            res.status(201).json(response);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateOrder = async (req, res) => {
    //#swagger.tags = ['Orders']
    try {
        const orderId = new ObjectId(req.params.id);

        const updateOrder = {
            userId: req.body.userId,
            orderDate: req.body.orderDate,
            totalAmount: req.body.totalAmount,
            status: req.body.status
        }
        const response = await mongodb.getDb().db().collection('orders').updateOne({ _id: orderId }, { $set: updateOrder });

        if (response.matchedCount === 0) {
            res.status(404).json({ message: 'No order found with this ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteOrder = async (req, res) => {
    //#swagger.tags = ['Orders']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Invalid order ID' });
            return;
        }
        const orderId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('orders').deleteOne({ _id: orderId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: 'Invalid ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAllOrders, getOrdersById, createOrder, updateOrder, deleteOrder };