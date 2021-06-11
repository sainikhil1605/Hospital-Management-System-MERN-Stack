const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const refreshtokens = require("../constants");
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
    console.log(req.body);
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
            const token = jwt.sign({ id: doc[0].admin_id, authorized: true, name: doc[0].admin_name }, "secretkey", { expiresIn: '30s' })
            const refreshtoken = jwt.sign({ id: doc[0].admin_id, authorized: true, name: doc[0].admin_name }, "secretkeyok")
            refreshtokens.push(refreshtoken);
            console.log(refreshtokens);
            res.header("auth-token", token).send({ "token": token, "refreshtoken": refreshtoken });
        }
    })
}
