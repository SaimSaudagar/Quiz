const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  recipes: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Recipe' 
    }
  ]
});

UserSchema.methods.hashPassword = async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    await this.hashPassword();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
