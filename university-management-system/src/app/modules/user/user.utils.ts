import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TUser } from './user.interface';
import UserModel from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean<TUser | null>();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (
  payload: TAcademicSemester,
): Promise<string> => {
  let currentID = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentID = lastStudentId.substring(6);
  }

  let incrementedID = (parseInt(currentID) + 1).toString().padStart(4, '0');
  incrementedID = `${payload.year}${payload.code}${incrementedID}`;

  return incrementedID;
};
