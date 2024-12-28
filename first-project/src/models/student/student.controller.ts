import { Request, Response } from 'express';
import { studentService } from './student.service';
import { validateStudent } from './student.validation';
import { z } from 'zod';
import { getErrorMessage } from '../../utils/errorMessage';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;

    const validStudent = validateStudent(studentData);

    const result = await studentService.createStudentIntoDb(validStudent);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Invalid student data',
        error: getErrorMessage(error.errors),
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: error as unknown as any,
      });
    }
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudentsFromDb();

    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: students,
    });
  } catch (error: any) {
    console.log(
      `⚠️ ~ file: student.controller.ts:16 ~ createStudent ~ error:`,
      error,
    );
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message as unknown as string,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await studentService.getStudentByIdFromDb(id);

    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: student,
    });
  } catch (error: any) {
    console.log(
      `⚠️ ~ file: student.controller.ts:16 ~ createStudent ~ error:`,
      error,
    );
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message as unknown as string,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await studentService.deleteStudentFromDb(id);

    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: student,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message as unknown as string,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
};
