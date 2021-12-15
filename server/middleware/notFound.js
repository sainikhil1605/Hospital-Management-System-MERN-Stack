const notFound = (req, res, next) => {
  res.status(404).json({ error: 'Route Not found' });
};

module.exports = notFound;
