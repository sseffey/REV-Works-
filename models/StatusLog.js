const mongoose = require('mongoose');

const statusLogSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    oldStatus: {
      type: String,
      required: true
    },
    newStatus: {
      type: String,
      required: true
    },
    note: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const StatusLog = mongoose.model('StatusLog', statusLogSchema);

module.exports = StatusLog;
