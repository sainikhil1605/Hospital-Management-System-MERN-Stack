const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const patientSchema = new Schema({
    patient_id: {
        type: String
    },
    patient_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    sex: {
        type: String
    },
    birthdate: {
        type: String
    },
    age: {
        type: String
    },
    bloodgroup: {
        type: String
    }
})
patientSchema.plugin(autoIncrement.plugin, { model: "patientModel", field: "patient_id" })
const patientModel = mongoose.model('patientModel', patientSchema);
module.exports = patientModel;