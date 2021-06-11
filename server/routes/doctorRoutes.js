const express = require('express');
const router = express.Router();
const docController = require("../controllers/docController")
router.get("/DoctorList", docController.getDoctorList)
router.post("/DoctorList", docController.postDoctorList)
router.delete("/deleteDoctor/:doctor_id", docController.deleteDoc);
router.post("/loginDoctor", docController.Login);
router.get("/profile/:doctor_id", docController.getDocProfile);
router.post("/profile", docController.editDocProfile);
module.exports = router