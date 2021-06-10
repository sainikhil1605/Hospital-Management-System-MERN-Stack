const feedbackModel = require("../models/feedbackModel")

exports.getFeedback = (req, res) => {
    feedbackModel.find({}, (err, doc) => {
        res.send(doc);
    })
}
exports.postFeedback = (req, res) => {
    console.log(req.body);
    const feedbackData = new feedbackModel(req.body);
    feedbackData.save((err) => {
        if (!err) {
            res.send("Inserted sucessfully");
        }
        else {
            res.send(err);
        }
    })
}