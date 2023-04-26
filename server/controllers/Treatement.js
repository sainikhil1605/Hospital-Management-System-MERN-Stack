const Treatement = require("../models/Treatments");
const { StatusCodes } = require("http-status-codes");
const addTreatement = async (req, res) => {
  const room = await Treatement.create(req.body);
  res.status(StatusCodes.CREATED).json({ room });
};
module.exports = {
  addTreatement,
};
