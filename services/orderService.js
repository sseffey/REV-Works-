const Option = require('../models/Option');
const CarModel = require('../models/CarModel');

// حساب السعر الكلي تلقائياً
const calculateTotalPrice = async (carModelId, selectedOptionIds) => {
  const car = await CarModel.findById(carModelId);
  if (!car) throw new Error('السيارة مش موجودة');

  let  = car.basePrice;

  for (const optionId of selectedOptionIds) {
    const option = await Option.findById(optionId);
    if (option) {
      total += option.extraPrice;
    }
  }

  return total;
};

// ترتيب الحالات
const statusOrder = ['Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered'];

const getNextStatus = (currentStatus) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return null;
  return statusOrder[currentIndex + 1];
};

module.exports = { calculateTotalPrice, getNextStatus };
