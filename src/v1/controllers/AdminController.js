const Admin = require('../model/AdminSchema');

// @desc get all the masjid
// @route GET /api/v1/admins/getAllAdmins
// @access Public
exports.getAllAdmins = async (req, res) => {
  try {
    const data = await Admin.find({});

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
