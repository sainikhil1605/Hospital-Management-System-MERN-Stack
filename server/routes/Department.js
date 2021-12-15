const express = require('express');
const router = express.Router();
const {
  getDepartments,
  postDepartment,
  deleteDepartment,
} = require('../controllers/Department');
const adminMiddleware = require('../middleware/adminMiddleware');
router.get('/', getDepartments);
router.post('/', adminMiddleware, postDepartment);
router.delete('/:id', adminMiddleware, deleteDepartment);
module.exports = router;
