import express from 'express';
import validateInput from '../../middlewares/validation/validate.js';
import { signinValidationSchema } from './signinValidation.js';
import { signUserIn } from './authController.js';
const authRouter = express.Router();

authRouter.post('/signin', validateInput(signinValidationSchema), signUserIn);

export default authRouter;
