const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../model/AdminSchema');

const getSignedJwtToken = function () {
  return jwt.sign({ username: this.username, email: this.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: 2000,
  });
};
// REGISTER
// @desc register new admin
// @route GET /api/v1/events/getAllEvent
// @access Public
exports.adminRegister = async (req, res) => {
  try {
    // create new admin
    const {
      adminName, email, password, role,
    } = req.body;

    const token = getSignedJwtToken();

    // save user and respond
    const admin = await Admin.create({
      adminName,
      email,
      role,
      password,
    });

    res.status(200).json({
      data: admin,
      token,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    res.status(500).json('Please provide an email and password');
  }
  try {
    // Check that user exists by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(500).json('Wrong email');
    } else {
      const validPassword = await bcrypt.compare(req.body.password, admin.password);
      if (validPassword) {
        const token = getSignedJwtToken();

        res.status(200).json({
          data: admin,
          token,
        });
      } else {
        res.status(500).json('Invalid Credentials');
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// const sendToken = (user, statusCode, res) => {
//   const token = user.getSignedJwtToken();
//   res.status(200).json({ success: true, token });
// };
