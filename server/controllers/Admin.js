const Admin = require('../models/Admin');

const postAdmin = async (req, res) => {
  const admin = await Admin.create(req.body).select('-password');
  res.status(200).json({ admin });
};
const getAdmins = async (req, res) => {
  const admins = await Admin.find({}).select('-password');
  res.status(200).json({ admins });
};
module.exports = {
  postAdmin,
  getAdmins,
};
