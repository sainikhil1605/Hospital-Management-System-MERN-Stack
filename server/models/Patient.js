const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Room = require("./Room");
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  sex: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
});
patientSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
patientSchema.methods.checkPassword = async function (password) {
  const isMatch = await bycrypt.compare(password, this.password);
  return isMatch;
};
patientSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "patient", name: this.name },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};
module.exports = mongoose.model("Patient", patientSchema);
