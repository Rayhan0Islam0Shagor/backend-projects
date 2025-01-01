import { type RequestHandler } from 'express';
import httpStatus from 'http-status';

const notFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  });
};

export default notFound;
