const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const adminSchema = new Schema({
    admin_id: {
        type: String
    },
    admin_name: {
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
adminSchema.plugin(autoIncrement.plugin, { model: "adminModel", field: "admin_id" })
const adminModel = mongoose.model('adminModel', adminSchema);
module.exports = adminModel;