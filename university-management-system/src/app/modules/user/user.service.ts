import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { generateDefaultPassword } from '../../utils/generatePassword';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import UserModel from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  const user: Pick<TUser, 'role' | 'password' | 'id'> = {} as TUser;

  user.password = password || generateDefaultPassword();
  user.role = 'student';

  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    // start a transaction
    session.startTransaction();

    // generate student id
    user.id = await generateStudentId(admissionSemester);

    // create a user (transaction - 1)
    const newUser = await UserModel.create([user], { session }); // array of user

    // create a student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    // create a student (transaction - 2)

    const student = await StudentModel.create([studentData], { session });
    if (!student.length) {
      throw new AppError(400, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return student[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as any);
    // throw new AppError(400, 'Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDb,
};
