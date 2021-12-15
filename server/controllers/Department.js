const Department = require('../models/Department');

const getDepartments = async (req, res) => {
  const departments = await Department.find({});
  res.status(200).json({ departments });
};
const postDepartment = async (req, res) => {
  const department = await Department.create(req.body);
  res.status(200).json({ department });
};
const deleteDepartment = async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);
  res.status(200).json({ department });
};
module.exports = {
  getDepartments,
  postDepartment,
  deleteDepartment,
};
