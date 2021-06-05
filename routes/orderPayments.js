
const express = require('express');
const router = express.Router();

const ordersHandler = require('./handler/order-payment');

router.get('/', ordersHandler.getOrders);

module.exports = router;
