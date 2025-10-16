const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');
    
    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mindSyncSecretKey');
    
    // Get user from token
    req.user = await User.findById(decoded.user.id).select('-password');
    
    if (!req.user || !req.user.isActive) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mindSyncSecretKey');
    // If token is for admin, allow access
    if (decoded.role === 'admin') {
      req.user = { role: 'admin', username: decoded.username, id: decoded.id };
      return next();
    }
    // Otherwise, fallback to user auth (for legacy admin users)
    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

const doctorAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!['doctor', 'admin'].includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Doctor role required.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

module.exports = { auth, adminAuth, doctorAuth };