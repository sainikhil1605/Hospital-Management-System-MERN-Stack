const adminDoctorMiddleware = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'doctor') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
module.exports = adminDoctorMiddleware;
