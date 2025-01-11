import { TGenericErrorResponse } from '../interfaces/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const statusCode = 400;
  const message = 'Duplicate key error';
  const errorSources = Object.keys(err.keyValue).map((key) => ({
    path: key,
    message: `${extractedMessage} is already exists`,
  }));

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateError;
