const jwt = require('jsonwebtoken');
const User = require('../models/User');

// التحقق من التوكن
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
      
    }

    if (!token) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ message: 'token is incorrect or expired.' });
  }
};

// التحقق من الـ Role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `مش مسموح — الـ role بتاعك (${req.user.role}) مش عنده صلاحية`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
