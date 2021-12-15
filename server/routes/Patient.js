const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const adminDocMiddleware = require('../middleware/adminDoctorMiddleware');
const {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
} = require('../controllers/Patient');
router.use('/', adminMiddleware, getAllPatientDetails);
router.get('/:id', adminDocMiddleware, getPatientDetails);
router.patch('/:id', adminMiddleware, updatePatient);
router.delete('/:id', adminMiddleware, deletePatient);
module.exports = router;
