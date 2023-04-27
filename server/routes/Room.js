const express = require("express");
const router = express.Router();
const {
  getRooms,
  postRooms,
  updateRoom,
  getRoom,
  deleteRoom,
  getRoomDetails,
} = require("../controllers/Room");
router.get("/", getRooms);
router.get("/details/:id", getRoomDetails);
router.get("/:id", getRoom);
router.delete("/:id", deleteRoom);
router.post("/", postRooms);
router.patch("/:id", updateRoom);
module.exports = router;
