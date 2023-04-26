const express = require("express");
const router = express.Router();
const {
  getRooms,
  postRooms,
  updateRoom,
  getRoom,
} = require("../controllers/Room");
router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/", postRooms);
router.patch("/:id", updateRoom);
module.exports = router;
