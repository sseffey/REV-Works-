const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
      // مثال: Color, Engine, Interior, Accessories
    },
    carModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarModel',
      required: true
    }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
