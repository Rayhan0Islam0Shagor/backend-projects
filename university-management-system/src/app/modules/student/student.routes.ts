import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

// Add a student
// router.post('/create-student', studentController.createStudent);

// Get all students
router.get('/get-all-students', studentController.getAllStudents);

// get a student by id
router.get('/:id', studentController.getStudentById);

// delete a student
router.delete('/:id', studentController.deleteStudent);

// update a student
router.patch('/:id', studentController.updateStudent);

export default router;