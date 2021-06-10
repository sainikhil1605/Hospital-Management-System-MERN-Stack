const express = require('express');
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
router.get("/feedbackList", feedbackController.getFeedback);
router.post("/feedbackList", feedbackController.postFeedback);
module.exports = router;