const express = require("express");
const router = express.Router();

const {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
} = require("../controllers/Doctor");

router.get("/", getDoctors);
router.post("/", postDoctors);
router.get("/:id", getDoctor);
router.patch("/:id", editDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
