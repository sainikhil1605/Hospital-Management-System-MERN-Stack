const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const { postAdmin, getAdmins } = require('../controllers/Admin');
router.get('/', adminMiddleware, getAdmins);
router.post('/', adminMiddleware, postAdmin);

module.exports = router;
