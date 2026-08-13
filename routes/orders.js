const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders');
const { validateOrder } = require('../middleware/validations');
const validator = require('../helper/validator.js');
const requireAuth = require('../middleware/requireAuth');

router.get('/', ordersControllers.getAllOrders);

router.get('/:id', ordersControllers.getOrdersById);

router.post('/', requireAuth, validateOrder, ordersControllers.createOrder);

router.put('/:id', requireAuth, validateOrder, ordersControllers.updateOrder);

router.delete('/:id', requireAuth, ordersControllers.deleteOrder);

module.exports = router;