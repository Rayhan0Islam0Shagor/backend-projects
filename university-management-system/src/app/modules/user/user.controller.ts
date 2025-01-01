import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  // const validStudent = validateStudent(studentData);

  const result = await UserServices.createStudentIntoDb(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
