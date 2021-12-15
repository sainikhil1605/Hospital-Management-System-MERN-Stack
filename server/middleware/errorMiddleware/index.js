const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = async (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
};
module.exports = errorHandlerMiddleware;
