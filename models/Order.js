const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    carModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarModel',
      required: true
    },
    selectedOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
