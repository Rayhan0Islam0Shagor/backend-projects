import { Request, Response, NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';

const notFound: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  });
};

export default notFound;
