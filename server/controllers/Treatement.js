const Treatement = require("../models/Treatments");
const { StatusCodes } = require("http-status-codes");
const addTreatement = async (req, res) => {
  const treatment = await Treatement.create(req.body);
  res.status(StatusCodes.CREATED).json({ treatment });
};

module.exports = {
  addTreatement,
};
