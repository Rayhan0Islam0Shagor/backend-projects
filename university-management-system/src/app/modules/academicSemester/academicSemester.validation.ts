import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterNames,
  MONTHS,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...MONTHS] as [string, ...string[]]),
    endMonth: z.enum([...MONTHS] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z
    .object({
      name: z.enum([...academicSemesterNames] as [string, ...string[]]),
      year: z.string(),
      code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
      startMonth: z.enum([...MONTHS] as [string, ...string[]]),
      endMonth: z.enum([...MONTHS] as [string, ...string[]]),
    })
    .partial(),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
