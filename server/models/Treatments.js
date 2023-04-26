const mongoose = require("mongoose");
const treatmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
});
module.exports = mongoose.model("Treatment", treatmentSchema);
