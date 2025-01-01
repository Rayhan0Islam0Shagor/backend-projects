import { Router } from 'express';
import studentRoutes from '../modules/student/student.routes';
import userRoutes from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
