const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already exists"],
  },
  phone: {
    type: String,
    unique: [true, "Phone already exists"],
  },
  department: {
    type: String,
  },
  fee: {
    type: Number,
  },
});
module.exports = mongoose.model("doctor", doctorSchema);
