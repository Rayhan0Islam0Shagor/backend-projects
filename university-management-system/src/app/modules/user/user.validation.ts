import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be less than 20 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    )
    .optional(),
  role: z.enum(['admin', 'student', 'faculty']),
});

export default userValidationSchema;
