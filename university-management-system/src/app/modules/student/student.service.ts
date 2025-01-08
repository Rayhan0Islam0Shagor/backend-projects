import { IStudent } from './student.interface';
import StudentModel from './student.model';

const getAllStudentsFromDb = async () => {
  const students = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return students;
};

const getStudentByIdFromDb = async (id: string) => {
  const student = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // const student = await StudentModel.aggregate([
  //   {
  //     $match: { id },
  //   },
  // ]);

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
