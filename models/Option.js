const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
      // مثال: Red, V8, Leather, Sunroof
    },
    extraPrice: {
      type: Number,
      default: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  { timestamps: true }
);

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
