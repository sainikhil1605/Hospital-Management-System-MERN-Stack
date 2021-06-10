const express = require('express');
const router = express.Router();
const docController = require("../controllers/docController")
router.get("/DoctorList", docController.getDoctorList)
router.post("/DoctorList", docController.postDoctorList)
router.delete("/deleteDoctor/:doctor_id", docController.deleteDoc);
module.exports = router