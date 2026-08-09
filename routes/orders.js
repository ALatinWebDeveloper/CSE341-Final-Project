const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders');
const { validateOrder } = require('../middleware/validations');

router.get('/', ordersControllers.getAllOrders);

router.get('/:id', ordersControllers.getOrdersById);

router.post('/', validateOrder, ordersControllers.createOrder);

router.put('/:id', validateOrder, ordersControllers.updateOrder);

router.delete('/:id', ordersControllers.deleteOrder);

module.exports = router;