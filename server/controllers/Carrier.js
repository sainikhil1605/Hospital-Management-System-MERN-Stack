const { StatusCodes } = require("http-status-codes");
const CarrierSchema = require("../models/Carrier");
const getCarriers = async (req, res) => {
  const carriers = await CarrierSchema.find({});

  res.status(StatusCodes.OK).json({ carriers });
};
const addCarrier = async (req, res) => {
  const carrier = await CarrierSchema.create(req.body);
  res.status(StatusCodes.OK).json({ carrier });
};
module.exports = { getCarriers, addCarrier };
