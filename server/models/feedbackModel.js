const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const feedbackSchema = new Schema({
    feedback_id: {
        type: Number,
    },
    feedback: {
        type: String,
    }
})
feedbackSchema.plugin(autoIncrement.plugin, { model: "feedbackModel", field: "feedback_id" })
const feedbackModel = mongoose.model('feedbackModel', feedbackSchema);
module.exports = feedbackModel;