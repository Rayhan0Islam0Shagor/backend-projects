import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error.interface';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = `Invalid Id: ${error.value}`;
  const errorSources = [
    {
      path: error.path,
      message: error?.message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleCastError;
