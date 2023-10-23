// =============================================
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
// =============================================
import userRouter from './modules/User/userRouter.js';
import authRouter from './modules/Authentication/authRouter.js';
import globalErrorHandler from './middlewares/error/errorController.js';
import AppError from './middlewares/error/appError.js';
import hpp from 'hpp';

// =============================================
function createApp() {
  const app = express();

  // =============================================
  const rateLimiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this api, Please try again later!',
  });

  app.use(helmet());
  app.use('/api', rateLimiter);
  app.use(express.json({ limit: '10kb' }));
  app.use(hpp());
  app.use(xss());

  // =============================================
  process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

  // =============================================
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);

  return app;
}
export default createApp;
