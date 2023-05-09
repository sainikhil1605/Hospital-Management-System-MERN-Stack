const express = require("express");
const router = express.Router();

const {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
  getPatients,
  getPrevPatients,
} = require("../controllers/Doctor");

router.get("/", getDoctors);
router.post("/", postDoctors);
router.get("/:id", getDoctor);
router.get("/patients/:id", getPatients);
router.get("/previousPatients/:id", getPrevPatients);
router.patch("/:id", editDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
