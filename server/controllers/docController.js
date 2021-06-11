const docModel = require("../models/docModel");
const jwt = require("jsonwebtoken");
const refresh = require("./adminController");
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
exports.Login = (req, res) => {
    docModel.find({ email: req.body.email, password: req.body.password }, (err, doc) => {
        if (doc.length != 0) {
            const token = jwt.sign({ id: doc[0].doctor_id, authorized: true, name: doc[0].doctor_name }, "secretkey", { expiresIn: '2m' })
            const refreshtoken = jwt.sign({ id: doc[0].doctor_id, authorized: true, name: doc[0].doctor_name }, "secretkeyok")
            refresh.refreshtokens.push(refreshtoken);
            res.header("auth-token", token).send({ "token": token });
        }
        else {
            res.send("Invalid Email or Password");
        }
    })
}
exports.getDocProfile = (req, res) => {
    docModel.find({ doctor_id: req.params.doctor_id }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            res.send(err);
        }
    })
}
exports.editDocProfile = (req, res) => {
    docModel.updateOne({ doctor_id: req.body.Id }, { doctor_name: req.body.Name, email: req.body.Email, phone: req.body.Phone, address: req.body.Address }, (err) => {
        if (!err) {
            res.send("Updated sucessfully");
        }
        else {
            res.send(err);
        }
    })
}