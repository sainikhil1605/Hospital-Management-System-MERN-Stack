const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const adminDocMiddleware = require("../middleware/adminDoctorMiddleware");
const {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
  addPatient,
  admitPatient,
  getAdmissionInfo,
} = require("../controllers/Patient");
const { getBillByPatient } = require("../controllers/Bill");

router.get("/", getAllPatientDetails);
router.post("/", addPatient);
router.get("/:id", getPatientDetails);
router.patch("/:id", updatePatient);
router.delete("/:id", adminMiddleware, deletePatient);
router.post("/admit", admitPatient);
router.get("/admit/:id", getAdmissionInfo);
router.get("/bill/:id", getBillByPatient);
module.exports = router;
