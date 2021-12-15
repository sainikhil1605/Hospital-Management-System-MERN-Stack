const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('department', departmentSchema);
