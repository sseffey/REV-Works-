const Order = require('../models/Order');
const StatusLog = require('../models/StatusLog');
const { calculateTotalPrice } = require('../services/orderService');

// POST /api/orders — العميل يطلب
const createOrder = async (req, res) => {
  try {
    const { carModel, selectedOptions } = req.body;

    if (!carModel) {
      return res.status(400).json({ message: 'You must choose a car' });
    }

    const totalPrice = await calculateTotalPrice(carModel, selectedOptions || []);

    const order = await Order.create({
      customer: req.user._id,
      carModel,
      selectedOptions: selectedOptions || [],
      totalPrice
    });

    res.status(201).json({ message: 'The request has been sent successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/orders/my — طلبات العميل
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('carModel', 'name image')
      .populate('selectedOptions', 'name extraPrice')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/orders — كل الطلبات (للموظف والأدمن)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email')
      .populate('carModel', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH /api/orders/:id/status — تحديث الحالة (موظف/أدمن)
const updateStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid condition' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'The request is not available' });

    // تسجيل التغيير في الـ StatusLog
    await StatusLog.create({
      order: order._id,
      updatedBy: req.user._id,
      oldStatus: order.status,
      newStatus: status,
      note: note || ''
    });

    order.status = status;
    if (note) order.notes = note;
    await order.save();

    res.status(200).json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/orders/:id — إلغاء الطلب (العميل لو Pending)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'الطلب مش موجود' });

    // التأكد إن الطلب بتاع العميل ده
    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not your request' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'You cant cancel the order after Ive confirmed it.' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: 'The order has been cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateStatus, cancelOrder };
