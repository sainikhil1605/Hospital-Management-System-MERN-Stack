const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
  room_no: {
    type: String,
  },
  cost_per_day: {
    type: Number,
  },
  no_of_beds: {
    type: Number,
  },
  meal_cost_per_day: {
    type: Number,
  },
});
module.exports = mongoose.model("Room", roomSchema);
