import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().min(2).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(2).max(20),
});

const guardianSchema = z.object({
  fatherName: userNameSchema,
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: userNameSchema,
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: userNameSchema,
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameSchema,
  email: z.string().email(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImg: z.string().url().optional(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  gender: z.enum(['male', 'female']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  isActive: z.enum(['active', 'blocked']).optional(),
  isDeleted: z.boolean().optional().default(false),
});

export type IStudent = z.infer<typeof studentValidationSchema>;

// Export the schema for validation
export const validateStudent = (data: IStudent) =>
  studentValidationSchema.parse(data);
