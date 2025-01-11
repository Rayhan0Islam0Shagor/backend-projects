import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interfaces/error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';

  const errorSources: TErrorSource[] = err.issues.map(
    ({ path, message }: ZodIssue) => ({
      path: path[path.length - 1],
      message: message,
    }),
  );

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
