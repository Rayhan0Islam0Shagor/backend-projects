import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

// Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
