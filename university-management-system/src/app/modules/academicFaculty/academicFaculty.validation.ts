import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Faculty name is required',
    }),
  }),
});

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
};
