import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const students = await studentService.getAllStudentsFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    data: students,
  });
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const student = await studentService.getStudentByIdFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: student,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const student = await studentService.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student retrieved successfully',
    data: student,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentService.updateStudentIntoDb(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
};
