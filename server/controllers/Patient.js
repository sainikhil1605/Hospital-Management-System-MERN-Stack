const { StatusCodes } = require("http-status-codes");
const Patient = require("../models/Patient");
const Admission = require("../models/Admission");
const getPatientDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const patient = await Patient.find({ _id: id }).select("-password");

  res.status(StatusCodes.OK).json({ patient });
};
const getAdmittedPatients = async (req, res) => {
  const patients = await Admission.find({
    bill_id: { $exists: null },
  }).populate("patient_id");
  // console.log(patients);
  res.status(StatusCodes.OK).json({ patients });
};
const addTreatment = async (req, res) => {
  const { id } = req.params;
  const { treatment } = req.body;
  console.log(treatment);
  const admission = await Admission.findByIdAndUpdate(id, {
    $push: { treatments: treatment },
  });
  res.status(StatusCodes.OK).json({ admission });
};

const getAllPatientDetails = async (req, res) => {
  const patients = await Patient.find({}).select("-password");
  res.status(StatusCodes.OK).json({ patients });
};
const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findByIdAndUpdate(id, req.body);
  res.status(StatusCodes.OK).json({ patient });
};
const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndDelete(id);
  if (!patient) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Patient not found" });
  } else {
    res.status(StatusCodes.OK).json({ patient });
  }
};
const addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(StatusCodes.CREATED).json({ patient });
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.BAD_REQUEST).json({ e });
  }
};
const admitPatient = async (req, res) => {
  // console.log(req.bod  y);
  try {
    const admission = await Admission.create(req.body);
    res.status(StatusCodes.CREATED).json({ admission });
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.BAD_REQUEST).json({ e });
  }
};
const getAdmissionInfo = async (req, res) => {
  const { id } = req.params;
  const admission = await Admission.find({ patient_id: id });
  res.status(StatusCodes.CREATED).json({ admission });
};

module.exports = {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
  addPatient,
  admitPatient,
  getAdmissionInfo,
  addTreatment,
  getAdmittedPatients,
};
