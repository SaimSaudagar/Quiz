const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate and authorize users
function authenticateUser(req, res, next) {
  const token = req.header('jwt_token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Check if the role is 'user'
    if (req.user.role === 'User') {
      next();
    } else {
      return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
    }
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Middleware to authenticate and authorize admins
function authenticateAdmin(req, res, next) {
  const token = req.header('jwt_token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Check if the role is 'admin'
    if (req.user.role === 'Admin') {
      next();
    } else {
      return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
    }
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = { authenticateUser, authenticateAdmin };
