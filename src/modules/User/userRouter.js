import express from 'express';

import {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from './userController.js';
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from './userValidation.js';
import { authenticateUser } from '../Authentication/authController.js';

const userRouter = express.Router();

// =============================================
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUserValidationSchema, createNewUser);
// =============================================
userRouter.get('/:id/profile', getUserById);
// =============================================
userRouter.use(authenticateUser);
// =============================================
userRouter.patch('/:id/update', updateUserValidationSchema, updateUserById);
// =============================================
userRouter.delete('/:id/delete', deleteUserById);

export default userRouter;
