const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
router.get("/patientList", patientController.getPatient);
router.post("/patientList", patientController.postPatient);
router.delete("/patientList/:patient_id", patientController.deletePatient);
module.exports = router