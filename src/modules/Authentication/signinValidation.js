// =============================================
import { check } from 'express-validator';
import validate from '../../middlewares/validation/validate.js';

// =============================================
export const signinValidationSchema = [
  check('email')
    .isString()
    .withMessage('Email should be a string!')
    .isEmail()
    .withMessage('Invalid Email Format!')
    .exists()
    .withMessage('You should provide an email property!')
    .escape(),
  check('password')
    .isString()
    .withMessage('Password should be a string!')
    // .isLength({ min: 8 })
    // .withMessage('Password should be at least 8 characters long!')
    .exists()
    .withMessage('You should provide a password property!'),
  validate,
];
