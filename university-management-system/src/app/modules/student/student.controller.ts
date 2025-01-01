import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';
import { validateStudent } from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await studentService.getAllStudentsFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students fetched successfully',
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const student = await studentService.getStudentByIdFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student fetched successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const student = await studentService.deleteStudentFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student retrieved successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const studentData = req.body;

    const validStudent = validateStudent(studentData);

    const result = await studentService.updateStudentIntoDb(id, validStudent);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
};
