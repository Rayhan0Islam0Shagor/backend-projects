import { generateDefaultPassword } from '../../utils/generatePassword';
import { IStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { generateId } from '../utils/counter.model';
import { TUser } from './user.interface';
import UserModel from './user.model';

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  const user: Pick<TUser, 'role' | 'password' | 'id'> = {} as TUser;

  user.password = password || generateDefaultPassword();
  user.role = 'student';
  user.id = await generateId('user');

  // create a user
  const newUser = await UserModel.create(user);

  // create a student
  if (Object.keys(newUser).length > 0) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const student = await StudentModel.create(studentData);
    return student;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
