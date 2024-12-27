import { z } from 'zod';

// Define Zod schemas for each sub-object
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long.')
    .max(20, 'First name cannot exceed 20 characters.')
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters long.')
    .max(20, 'Last name cannot exceed 20 characters.')
    .trim(),
});

const guardianValidationSchema = z.object({
  fatherName: userNameValidationSchema,
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherName: userNameValidationSchema,
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim(),
});

const localGuardianValidationSchema = z.object({
  name: userNameValidationSchema,
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim(),
});

const studentValidationSchema = z.object({
  id: z.string().trim(),
  name: userNameValidationSchema,
  email: z.string().email('Invalid email address.').trim(),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format.')
    .optional(),
  contactNo: z.string().trim(),
  emergencyContactNo: z.string().trim(),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  profileImg: z.string().trim().optional(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender must be either "male" or "female".' }),
  }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({
        message:
          'Invalid blood group. Allowed values are A+, A-, B+, B-, AB+, AB-, O+, O-.',
      }),
    })
    .optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({
        message: 'Status must be either "active" or "blocked".',
      }),
    })
    .default('active'),
});

export type IStudent = z.infer<typeof studentValidationSchema>;

// Export the schema for validation
export const validateStudent = (data: IStudent) =>
  studentValidationSchema.parse(data);
