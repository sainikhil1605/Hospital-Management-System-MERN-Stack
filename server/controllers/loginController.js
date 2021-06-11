const adminModel = require("../models/adminModel");
const docModel = require("../models/docModel");
const patientModel = require("../models/patientModel");
var refreshtokens = []
exports.Login = (req, res) => {
    var currModel = ""
    if (req.body.role == "admin") {
        currModel = adminModel;
    }
    else if (req.body.role = "doctor") {
        currModel = docModel
    }
    else {
        currModel = patientModel
    }
    currModel.find({ email: req.body.email, password: req.body.password }, (err, doc) => {
        if (doc.length != 0) {

        }
    })
}