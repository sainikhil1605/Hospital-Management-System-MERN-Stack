var patientModel = require("../models/patientModel");
exports.getPatient = (req, res) => {

    patientModel.find({}, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            res.send(err);
        }
    })
}
exports.postPatient = (req, res) => {
    const patientData = new patientModel(req.body);
    patientData.save((err) => {
        if (!err) {
            res.send("Patient Inserted Sucessfully");
        }
        else {
            res.send(err);
        }
    })
}
exports.deletePatient = (req, res) => {
    console.log(req.params);
    patientModel.remove({ patient_id: req.params.patient_id }, (err) => {
        if (err) {
            res.send("Error occured");
        }
        else {
            res.send("Delted Succesfully");

        }
    })
}