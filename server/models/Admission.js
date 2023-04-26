const mongoose = require("mongoose");
const admissionSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Types.ObjectId,
    ref: "doctor",
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment",
    },
  ],
  bill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
  },
  admit_date: {
    type: Date,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  insurance_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InsuranceCarrier",
  },
  reason_for_admit: {
    type: String,
  },
});

module.exports = mongoose.model("Admission", admissionSchema);
