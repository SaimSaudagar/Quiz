const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

exports.createUser = async (name, email, password, role, res) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    if(name.length < 3) {
      return res.status(400).json({ msg: 'Name must be at least 3 characters long' });
    }
    if(password.length < 8) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
    }

    user = new User({
      name,
      email,
      password,
    });

    if (role) {
      const assignedRoles = await Role.find({ name: { $in: role } });
      if(assignedRoles === undefined || assignedRoles.length == 0) {
        return res.status(400).json({ msg: 'Role not found' });
      }
      user.roles = assignedRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: 'User' });
      user.roles = [role._id];
    }

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    res.json(payload);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('roles');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  let userFields = {};

  if (name && name.length < 3) {
    return res.status(400).json({ msg: 'Name must be at least 3 characters long' });
  }
  
  if (name) userFields.name = name;
  if (email) userFields.email = email;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
      }
      user.password = password;
      await user.hashPassword();
    }

    user = await User.findByIdAndUpdate(req.params.id, { $set: userFields }, { new: true });

    if (password) {
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}