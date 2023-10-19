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
import validateInput from '../../middlewares/validation/validate.js';
import { authenticateUser } from '../Authentication/authController.js';

const userRouter = express.Router();

userRouter
  .get('/', getAllUsers)
  .post('/', validateInput(createUserValidationSchema), createNewUser);

userRouter.get('/:id/profile', getUserById);

userRouter.use(authenticateUser);
userRouter.patch(
  '/:id/update',
  validateInput(updateUserValidationSchema),
  updateUserById
);

userRouter.delete('/:id/delete', deleteUserById);

export default userRouter;
