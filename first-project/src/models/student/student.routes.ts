import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

// Add a student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// get a student by id
router.get('/:id', studentController.getStudentById);

// delete a student
router.delete('/:id', studentController.deleteStudent);

export default router;
