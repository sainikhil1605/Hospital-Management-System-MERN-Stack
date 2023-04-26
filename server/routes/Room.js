const express = require("express");
const router = express.Router();
const { getRooms, postRooms, updateRoom } = require("../controllers/Room");
router.get("/", getRooms);
router.post("/", postRooms);
router.patch("/:id", updateRoom);
module.exports = router;
