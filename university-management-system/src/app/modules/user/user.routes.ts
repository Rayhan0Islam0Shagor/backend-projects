import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

// Add a student
router.post('/create-student', UserControllers.createUser);

export default router;
