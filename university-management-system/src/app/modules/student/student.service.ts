import StudentModel from './student.model';
import { IStudent } from './student.validation';

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

const updateStudentIntoDb = async (id: string, studentData: IStudent) => {
  const student = await StudentModel.updateOne({ id }, studentData);
  return student;
};

export const studentService = {
  getAllStudentsFromDb,
  getStudentByIdFromDb,
  deleteStudentFromDb,
  updateStudentIntoDb,
};
