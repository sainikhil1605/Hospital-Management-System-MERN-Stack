const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const {
  postAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
} = require('../controllers/Admin');
router.get('/', adminMiddleware, getAdmins);
router.post('/', adminMiddleware, postAdmin);
router.get('/:id', adminMiddleware, getAdmin);
router.patch('/:id', adminMiddleware, updateAdmin);
module.exports = router;
