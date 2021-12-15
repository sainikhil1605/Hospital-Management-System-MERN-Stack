const Doctor = require('../models/Doctor');
const { StatusCodes } = require('http-status-codes');
const getAppointments = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  const appointments = doctor.appointments;
  res.status(StatusCodes.OK).json({ appointments });
};
const postAppointment = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  doctor.appointments.push(req.body);
  doctor.save();
  res.status(StatusCodes.CREATED).json({ doctor });
};
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const doctor = await Doctor.findById(user._id);
  const index = doctor.appointments.findIndex(
    (appointment) => appointment._id == id
  );
  if (index == -1) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Appointment not found' });
  } else {
    doctor.appointments[index] = req.body;
    doctor.save();
    res.status(StatusCodes.OK).json({ doctor });
  }
};
module.exports = {
  getAppointments,
  postAppointment,
  updateAppointment,
};
