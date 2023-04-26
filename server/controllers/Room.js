const Room = require("../models/Room");
const Admission = require("../models/Admission");
const { StatusCodes } = require("http-status-codes");
const getRooms = async (req, res) => {
  const rooms = await Room.find({});

  res.status(StatusCodes.OK).json({ rooms });
};
const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Admission.find({ room_id: id }).populate("patient_id");
  res.status(StatusCodes.OK).json({ room });
};
const postRooms = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(StatusCodes.CREATED).json({ room });
};
const updateRoom = async (req, res) => {
  const { id } = req.params;

  const room = await Room.findByIdAndUpdate(id, req.body);
  res.status(StatusCodes.OK).json({ room });
};
module.exports = {
  getRooms,
  postRooms,
  updateRoom,
  getRoom,
};
