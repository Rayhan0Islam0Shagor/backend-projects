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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (
  payload: TAcademicSemester,
): Promise<string> => {
  const currentID = (await findLastStudentId()) || (0).toString();
  let incrementedID = (parseInt(currentID) + 1).toString().padStart(4, '0');
  incrementedID = `${payload.year}${payload.code}${incrementedID}`;

  return incrementedID;
};
