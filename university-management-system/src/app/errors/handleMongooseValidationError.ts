import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interfaces/error.interface';

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSource[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: el?.path,
      message: el?.message,
    }),
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleMongooseValidationError;
