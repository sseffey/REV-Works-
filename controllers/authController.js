const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {RegesterSchema,loginSxhema} = require('./Validations/AuthValidations')
// إنشاء التوكن
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register
const register = async (req, res) => {
  try {

    const {error , value } = RegesterSchema.validate(req.body,{
      abortEarly:false,
      stripUnknown:true
    })
    if(error) return res.status(400).json({msg:error.details.map(err=>err.message)})


    const { name, email, password } = value;

    // if (!name || !email || !password) {
    //   return res.status(400).json({ message: 'كل الحقول مطلوبة' });
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is available' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Registration completed successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
     const {error , value } = loginSxhema.validate(req.body,{
      abortEarly:false,
      stripUnknown:true
    })
    if(error) return res.status(400).json({msg:error.details.map(err=>err.message)})

    const { email, password } = value;

    // if (!email || !password) {
    //   return res.status(400).json({ message: 'الإيميل والباسورد مطلوبين' });
    // }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'completed successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login };
