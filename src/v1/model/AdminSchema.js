const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const AdminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true, bufferCommands: false },
);

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  return resetToken;
};

AdminSchema.methods.matchPassword = async function (password) {
  await bcrypt.compare(password, this.password);
};

AdminSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ username: this.username, email: this.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: 2000,
  });
};

module.exports = mongoose.model('Admin', AdminSchema);
