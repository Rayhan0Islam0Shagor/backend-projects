import { generateId } from '../utils/counter.model';
import { IStudent } from './student.interface';
import StudentModel from './student.model';

const createStudentIntoDb = async (student: IStudent) => {
  student.id = await generateId('student');

  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDb = async () => {
  const students = await StudentModel.find();
  return students;
};

const getStudentByIdFromDb = async (id: string) => {
  const student = await StudentModel.findOne({ id });
  return student;
};

export const studentService = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getStudentByIdFromDb,
};
