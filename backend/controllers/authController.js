const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('./userController');
const Role = require('../models/Role');

require('dotenv').config();

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  createUser( name, email, password, role, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const role = await Role.findById(user.roles);

    const payload = {
      user: {
        id: user.id,
        role: role.name,
      },
    };

    console.log(payload);

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.authAdmin = async (req, res, next) => {
  const token = req.header('jwt_token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    const role = await Role.findById(user.roles);

    if (role.name === 'Admin') {
      req.user = user;
      res.status(200).json({ msg: true });
    } else {
      res.status(200).json({ msg: false });
    }
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}