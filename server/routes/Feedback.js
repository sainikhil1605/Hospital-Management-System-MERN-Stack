const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const { getFeedback, postFeedback } = require('../controllers/Feedback');
router.get('/', adminMiddleware, getFeedback);
router.post('/', postFeedback);
module.exports = router;
