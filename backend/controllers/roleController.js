const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    role = await Role.findOne({ name });
    if (role) {
      return res.status(400).json({ msg: 'Role already exists' });
    }
    let newRole = new Role({
      name,
    });
    await newRole.save();
    res.json(newRole);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.json(role);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updateRole = async (req, res) => {
  const { name } = req.body;

  try {
    let role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    role = await Role.findByIdAndUpdate(
      req.params.id,
      { $set: { name } },
      { new: true },
    );

    res.json(role);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteRole = async (req, res) => {
  try {
    let role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    await Role.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Role deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
