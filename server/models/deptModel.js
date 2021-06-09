const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const deptSchema = new Schema({
    dept_id: {
        type: Number
    },
    DeptName: {
        type: String,
    },
    DeptDescription: {
        type: String,
    }
})
deptSchema.plugin(autoIncrement.plugin, { model: "deptModel", field: "dept_id" })
const deptModel = mongoose.model('deptModel', deptSchema);
module.exports = deptModel;