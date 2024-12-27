import { generateId } from '../utils/counter.model';
import StudentModel from './student.model';
import { IStudent } from './student.validation';

const createStudentIntoDb = async (studentData: IStudent) => {
  studentData.id = await generateId('student');

  // const result = await StudentModel.create(student);

  // static method

  const student = new StudentModel(); // create an instance

  if (await student.isUserExists(studentData.id)) {
    throw new Error('Student with this ID already exists.');
  }

  const result = await student.save(); // built in instance method

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
