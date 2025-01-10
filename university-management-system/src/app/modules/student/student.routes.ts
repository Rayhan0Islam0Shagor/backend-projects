import { Router } from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = Router();

// get a student by id
router.get('/:studentId', studentController.getStudentById);

// delete a student
router.delete('/:studentId', studentController.deleteStudent);

// update a student
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
);

// Get all students
router.get('/', studentController.getAllStudents);

export default router;
