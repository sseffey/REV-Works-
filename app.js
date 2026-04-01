require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const orderRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);

// // Route تجريبي
// app.get('/', (req, res) => {
//   res.json({ message: 'CustomOrder API is running!' });
// });

// Connected MongoDB
const PORT = process.env.PORT || 5000;
async function MongoDB() {
  try{
  await mongoose.connect(process.env.MONGO_URI)
 console.log(' Connected to MongoDB');
  
  }catch(error){
    console.log(error)
  }
}
MongoDB()

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  
