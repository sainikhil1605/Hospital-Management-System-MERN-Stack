const mongoose = require("mongoose");
const Carrier = require("./Carrier");
const Doctor = require("./Doctor");
const Room = require("./Room");
const Admission = require("./Admission");
const billSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
  admission_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission",
  },
  discharge_date: {
    type: Date,
  },
  total_room_cost: {
    type: Number,
  },
  total_cost: {
    type: Number,
  },
  total_carrier_payable: {
    type: Number,
  },
  net_payable_cost: {
    type: Number,
  },
  total_treatements_cost: {
    type: Number,
  },
  meals_cost: {
    type: Number,
  },
});
billSchema.pre("save", async function (next) {
  // await Admission.findById(this.admission_id).populate("treatments")

  const { admit_date, treatments, room_id, doctor_id, insurance_id } =
    await Admission.findById(this.admission_id).populate("treatments");

  const total_treatements_cost = treatments.reduce(
    (ac, cur) => ac + cur.cost,
    0
  );

  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs((this.discharge_date - admit_date) / oneDay)
  );
  // console.log(diffDays);
  const { cost_per_day, meal_cost_per_day } = await Room.findById(room_id);

  const { fee: doctorFee } = await Doctor.findById(doctor_id);
  const { percentage } = await Carrier.findById(insurance_id);
  this.total_treatements_cost = total_treatements_cost;
  this.total_room_cost = diffDays * cost_per_day;
  this.meals_cost = diffDays * meal_cost_per_day;
  this.total_cost =
    doctorFee +
    this.total_room_cost +
    this.total_treatements_cost +
    this.meals_cost;

  this.total_carrier_payable = this.total_cost * (percentage / 100.0);
  this.net_payable_cost = this.total_cost - this.total_carrier_payable;
  // const admission = await Admission.findById(this.admission_id);
  next();
});
module.exports = mongoose.model("Bill", billSchema);
