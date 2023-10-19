import express from 'express';
import morgan from 'morgan';

import userRouter from './modules/User/userRouter.js';
import authRouter from './modules/Authentication/authRouter.js';
import globalErrorHandler from './middlewares/error/errorController.js';
import AppError from './middlewares/error/appError.js';

const app = express();

app.use(express.json());

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;
