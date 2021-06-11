const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const docSchema = new Schema({
    doctor_id: {
        type: Number,

    },
    doctor_name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    department: {
        type: String,
    },
    address: {
        type: String,
    }
})
docSchema.plugin(autoIncrement.plugin, { model: "docModel", field: "doctor_id" })
const docModel = mongoose.model('docModel', docSchema);
module.exports = docModel;