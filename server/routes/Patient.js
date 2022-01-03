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
router.get('/:id', getPatientDetails);
router.patch('/:id', updatePatient);
router.delete('/:id', adminMiddleware, deletePatient);
module.exports = router;
