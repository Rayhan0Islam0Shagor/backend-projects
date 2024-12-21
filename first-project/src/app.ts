import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import studentRoutes from './models/student/student.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
