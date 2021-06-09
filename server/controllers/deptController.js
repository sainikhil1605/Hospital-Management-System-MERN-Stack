const deptModel = require("../models/deptModel")

exports.getDepts = function (req, res) {
    deptModel.find({}, function (err, doc) {
        if (err) {
            res.send("Error occured")
        }
        else {
            res.send(doc);
        }
    })
}
exports.postDepts = function (req, res) {
    const dept = new deptModel(req.body);
    dept.save(function (err) {
        if (!err) {
            res.send("Inserted Successfully");
        }
        else {
            res.send(err);
        }
    })
}
exports.deleteDepts = function (req, res) {
    console.log(req.params)
    deptModel.remove({ dept_id: req.params.dept_id }, function (err) {
        if (err) {
            res.send("Error occured");
        }
        else {
            res.send("Delted Succesfully");

        }
    })
}