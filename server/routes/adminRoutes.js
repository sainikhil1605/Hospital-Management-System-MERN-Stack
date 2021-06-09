const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/AdminList", adminController.getAdmin);
router.post("/AdminList", adminController.postAdmin);
router.post("/Login", adminController.Login);
module.exports = router