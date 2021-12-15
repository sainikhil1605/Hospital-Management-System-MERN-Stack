const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
  },
});

module.exports = mongoose.model('feedbackModel', feedbackSchema);
