import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z
  .object({
    firstName: z.string().min(3).max(20),
    middleName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
  })
  .partial();

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z
      .object({
        name: updateUserNameValidationSchema,
        designation: z.string().max(30),
        gender: z.enum([...Gender] as [string, ...string[]]),
        dateOfBirth: z.string(),
        email: z.string().email(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        profileImg: z.string(),
      })
      .partial(),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
