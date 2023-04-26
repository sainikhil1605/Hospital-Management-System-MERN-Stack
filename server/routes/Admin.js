const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  postAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
} = require("../controllers/Admin");
router.get("/", adminMiddleware, getAdmins);
router.post("/", postAdmin);
router.get("/:id", getAdmin);
router.patch("/:id", updateAdmin);
module.exports = router;
