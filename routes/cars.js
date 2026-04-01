const express = require('express');
const router = express.Router();
const { getCars, getCarById, addCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/cars — الكل
router.get('/', getCars);

// GET /api/cars/:id — الكل
router.get('/:id', getCarById);

// POST /api/cars — الأدمن بس
router.post('/', protect, authorize('admin'), addCar);

// PUT /api/cars/:id — الأدمن بس
router.put('/:id', protect, authorize('admin'), updateCar);

// DELETE /api/cars/:id — الأدمن بس
router.delete('/:id', protect, authorize('admin'), deleteCar);

module.exports = router;
