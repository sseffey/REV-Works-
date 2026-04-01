const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateStatus, cancelOrder } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

// POST /api/orders — العميل يطلب
router.post('/', protect, authorize('customer'), createOrder);

// GET /api/orders/my — طلبات العميل
router.get('/my', protect, authorize('customer'), getMyOrders);

// GET /api/orders — الموظف والأدمن
router.get('/', protect, authorize('staff', 'admin'), getAllOrders);

// PATCH /api/orders/:id/status — الموظف والأدمن
router.patch('/:id/status', protect, authorize('staff', 'admin'), updateStatus);

// DELETE /api/orders/:id — العميل يلغي
router.delete('/:id', protect, authorize('customer'), cancelOrder);

module.exports = router;
