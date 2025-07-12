const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password should be at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //this only works on create and save!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});
userSchema.pre('save', async function (next) {
  //Only run when password is modified
  if (!this.isModified('password')) return next();

  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
