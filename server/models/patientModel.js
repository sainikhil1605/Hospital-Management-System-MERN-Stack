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
    }
})
patientSchema.plugin(autoIncrement.plugin, { model: "patientModel", field: "admin_id" })
const patientModel = mongoose.model('patientModel', adminSchema);
module.exports = patientModel;