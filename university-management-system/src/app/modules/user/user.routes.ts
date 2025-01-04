import { Router } from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

// Add a student
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createUser,
);

export default router;
