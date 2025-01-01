import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: { path: string; message: string }[] = [];

  // Handle Mongoose Validation Errors
  if (error?.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errorMessages = Object.keys(error.errors).map((key) => ({
      path: key,
      message: error.errors[key].message,
    }));
  }

  // Handle Mongoose Cast Errors (Invalid ObjectId)
  else if (error?.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
    errorMessages = [{ path: error.path, message }];
  }

  // Handle Mongoose Duplicate Key Errors
  else if (error?.code === 11000) {
    statusCode = 400;
    message = 'Duplicate key error';
    errorMessages = Object.keys(error.keyValue).map((key) => ({
      path: key,
      message: `Duplicate value: ${error.keyValue[key]}`,
    }));
  }

  // Handle Custom Errors
  else if (error?.statusCode) {
    statusCode = error.statusCode;
    message = error.message || message;
    if (error.errors) {
      errorMessages = error.errors.map(
        (err: { path: string; message: string }) => ({
          path: err.path,
          message: err.message,
        }),
      );
    }
  }

  // Fallback for Unknown Errors
  else if (error?.message) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errorMessages,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack, // Hide stack trace in production
  });
};

export default globalErrorHandler;
