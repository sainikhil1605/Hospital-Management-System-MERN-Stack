const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
router.get("/appointmentList/:doctor_id", appointmentController.getAppoitments);
router.post("/appointmentList", appointmentController.postAppointment);
router.post("/addPrescription", appointmentController.postPrescription);
module.exports = router;