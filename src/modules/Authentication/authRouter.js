import express from 'express';
// =============================================
import { signinValidationSchema } from './signinValidation.js';
import { signUserIn } from './authController.js';

// =============================================
const authRouter = express.Router();

// =============================================
authRouter.post('/signin', signinValidationSchema, signUserIn);

export default authRouter;
