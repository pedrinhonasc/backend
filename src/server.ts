import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './shared/routes/index';
import uploadConfig from './config/upload';
import AppError from './shared/errors/AppError';

import './shared/database';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadImgPath));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server running');
});
