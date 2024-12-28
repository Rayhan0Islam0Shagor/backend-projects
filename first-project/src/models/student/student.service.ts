import { generateId } from '../utils/counter.model';
import StudentModel from './student.model';
import { IStudent } from './student.validation';

const createStudentIntoDb = async (studentData: IStudent) => {
  studentData.id = await generateId('student');

  const result = await StudentModel.create(studentData);
  return result;

  // const student = new StudentModel(); // create an instance

  // // if (await student.isUserExists(studentData.id)) {
  // //   throw new Error('Student with this ID already exists.');
  // // }

  // const result = await student.save(); // built in instance method
};

const getAllStudentsFromDb = async () => {
  const students = await StudentModel.find();
  return students;
};

const getStudentByIdFromDb = async (id: string) => {
  // const student = await StudentModel.findOne({ id });

  const student = await StudentModel.aggregate([
    {
      $match: { id },
    },
  ]);

  return student;
};

const deleteStudentFromDb = async (id: string) => {
  const student = await StudentModel.updateOne({ id }, { isDeleted: true });
  return student;
};

export const studentService = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getStudentByIdFromDb,
  deleteStudentFromDb,
};
