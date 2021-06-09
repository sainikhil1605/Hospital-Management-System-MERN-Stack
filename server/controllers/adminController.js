const adminModel = require("../models/adminModel");

exports.postAdmin = function (req, res) {
    const adminData = new adminModel(req.body);
    adminData.save(function (err) {
        if (!err) {
            res.send("Admin Inserted Succesfully");
        }
        else {
            res.send(err);
        }
    })
}
exports.getAdmin = function (req, res) {
    adminModel.find({}, function (er, doc) {
        res.send(doc);
    })
}
exports.Login = function (req, res) {
    const adminData = req.body;
    adminModel.find({ email: adminData.email, password: adminData.password }, function (err, doc) {
        if (doc.length == 0) {
            res.send("User Does not exist");
        }
        else {
            res.send("Hello admin");
        }
    })
}