const mongoose = require('mongoose');

const carModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    basePrice: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const CarModel = mongoose.model('CarModel', carModelSchema);

module.exports = CarModel;
