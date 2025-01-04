import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import {
  TAcademicSemester,
  TAcademicSemesterName,
} from './academicSemester.interface';
import AcademicSemesterModel from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (
    academicSemesterNameCodeMapper[payload.name as TAcademicSemesterName] !==
    payload.code
  ) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemesterModel.create(payload);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
