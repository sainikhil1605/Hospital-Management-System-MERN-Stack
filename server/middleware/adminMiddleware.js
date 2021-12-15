const adminMiddleware = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
module.exports = adminMiddleware;
