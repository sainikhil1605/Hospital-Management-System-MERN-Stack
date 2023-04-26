const Doctor = require("../models/Doctor");
const { StatusCodes } = require("http-status-codes");
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find({});

  res.status(StatusCodes.OK).json({ doctors });
};
const postDoctors = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(StatusCodes.CREATED).json({ doctor });
};
const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ doctor });
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).select("-password");
  res.status(StatusCodes.OK).json({ doctor });
};
const editDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ doctor });
};

module.exports = {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
};
