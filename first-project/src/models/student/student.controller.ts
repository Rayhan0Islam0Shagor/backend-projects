import { Request, Response } from 'express';
import { studentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const result = await studentService.createStudentIntoDb(student);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
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

export const studentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
