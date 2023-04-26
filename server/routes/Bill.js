const express = require("express");
const router = express.Router();
const { addBill, getBills, getBill } = require("../controllers/Bill");
router.get("/", getBills);
router.post("/", addBill);
router.get("/:billId", getBill);
module.exports = router;
