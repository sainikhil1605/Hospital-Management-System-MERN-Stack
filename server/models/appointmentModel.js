const mongoose = require("mongoose");
const Schema = mongoose.Schema
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const appointmentSchema = new Schema({
    appointment_id: {
        type: Number,
    },
    doctor_id: {
        type: String,
    },
    patient_name: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    phone: {
        type: String,
    },
    prescription: {
        type: String,
    }
})
appointmentSchema.plugin(autoIncrement.plugin, { model: "appointmentModel", field: "appointment_id" })
const appointmentModel = mongoose.model("appointmentModel", appointmentSchema);
module.exports = appointmentModel;