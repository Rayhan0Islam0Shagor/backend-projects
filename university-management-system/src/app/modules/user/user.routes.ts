import { Router } from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const router = Router();

// Add a student
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createUser,
);

// Add a faculty
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

export default router;
