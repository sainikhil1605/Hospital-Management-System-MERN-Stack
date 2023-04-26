const express = require("express");
const router = express.Router();
const { addCarrier, getCarriers } = require("../controllers/Carrier");
router.get("/", getCarriers);
router.post("/", addCarrier);
module.exports = router;
