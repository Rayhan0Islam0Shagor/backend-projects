import { z } from 'zod';

// Reusable error function
export const getErrorMessage = (errors: z.ZodIssue[]): string[] => {
  return errors.map((err) => err.message);
};
