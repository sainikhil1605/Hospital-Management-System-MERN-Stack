const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers; //get token from header
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Missing or invalid token' });
  }
  const token = authorization.split(' ')[1];

  const user = await jwt.verify(token, process.env.JWT_KEY);
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
};
module.exports = authMiddleware;
