const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const { postAdmin, getAdmins } = require('../controllers/Admin');
router.get('/', adminMiddleware, getAdmins);
router.post('/', adminMiddleware, postAdmin);
router.get('/:id', adminMiddleware, getAdmin);
module.exports = router;
