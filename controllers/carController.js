const CarModel = require('../models/CarModel');
const Category = require('../models/Category');
const Option = require('../models/Option');
const {CarSchema} = require('./Validations/CarValidations')
// GET /api/cars — الكل يشوف
const getCars = async (req, res) => {
  try {
    const cars = await CarModel.find({ isAvailable: true });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/cars/:id — تفاصيل سيارة مع خياراتها
const getCarById = async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'The car is not there' });

    const categories = await Category.find({ carModel: car._id });
    const categoriesWithOptions = await Promise.all(
      categories.map(async (cat) => {
        const options = await Option.find({ category: cat._id });
        return { ...cat._doc, options };
      })
    );

    res.status(200).json({ car, categories: categoriesWithOptions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/cars — الأدمن بس
const addCar = async (req, res) => {
  try {
 const {error , value } = CarSchema.validate(req.body,{
      abortEarly:false,
      stripUnknown:true
    })
    if(error) return res.status(400).json({msg:error.details.map(err=>err.message)})

    
    const { name, basePrice, image, description } = value;
  
    const car = await CarModel.create({ name, basePrice, image, description });
    res.status(201).json({ message: 'The car has been added', car });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/cars/:id — الأدمن بس
const updateCar = async (req, res) => {
  try {
    const car = await CarModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'The car is not there' });
    res.status(200).json({ message: 'Modified', car });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/cars/:id — الأدمن بس
const deleteCar = async (req, res) => {
  try {
    const car = await CarModel.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'The car is not there' });
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCars, getCarById, addCar, updateCar, deleteCar };
