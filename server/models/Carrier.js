const mongoose = require("mongoose");
const carrierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  percentage: {
    type: Number,
    required: [true, "Percentage is required"],
  },
});

module.exports = mongoose.model("InsuranceCarrier", carrierSchema);
