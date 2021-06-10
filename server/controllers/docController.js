const docModel = require("../models/docModel");
exports.getDoctorList = function (req, res) {
    docModel.find({}, function (err, docs) {
        res.send(docs);
    })
}
exports.postDoctorList = function (req, res) {
    console.log(req.body)
    const docData = new docModel(req.body);
    docData.save(function (err) {
        if (!err)
            res.send("Doctor inserted succesfully")
        else
            res.send(err);
    })
}
exports.deleteDoc = (req, res) => {
    console.log(req.params);
    docModel.remove({ doctor_id: req.params.doctor_id }, function (err) {
        if (err) {
            res.send("Error occured");
        }
        else {
            res.send("Delted Succesfully");

        }
    })
}