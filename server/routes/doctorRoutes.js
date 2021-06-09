const express = require('express');
const router = express.Router();
const docController = require("../controllers/docController")
router.get("/DoctorList", docController.getDoctorList)
router.post("/DoctorList", docController.postDoctorList)
module.exports = router