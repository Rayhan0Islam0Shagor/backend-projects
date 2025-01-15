import { Router } from 'express';
import studentRoutes from '../modules/student/student.routes';
import userRoutes from '../modules/user/user.routes';
import academicSemesterRoutes from '../modules/academicSemester/academicSemester.routes';
import academicFacultyRoutes from '../modules/academicFaculty/academicFaculty.routes';
import academicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.routes';
import FacultyRoutes from '../modules/faculty/faculty.routes';

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
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
