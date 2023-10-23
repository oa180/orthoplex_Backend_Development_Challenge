import { check } from 'express-validator';
import validate from '../../middlewares/validation/validate.js';

export const createUserValidationSchema = [
  check('name')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Name should be at least 6 characters long')
    .exists()
    .withMessage('You should provide a name property')
    .escape(),

  check('email')
    .isString()
    .isEmail()
    .withMessage('Invalid Email Format')
    .exists()
    .withMessage('You should provide an email property')
    .escape(),

  check('handler')
    .isString()
    .isLength({ min: 4 })
    .withMessage('Handler should be at least 4 characters long')
    .exists()
    .withMessage('You should provide a handler property')
    .escape(),

  check('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long')
    .exists()
    .withMessage('You should provide a password property'),

  validate,
];

export const updateUserValidationSchema = [
  check('id')
    .isString()
    .notEmpty()
    .withMessage('You should provide a user id in the query')
    .escape(),

  check('name')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Name should be at least 6 characters long')
    .notEmpty()
    .withMessage('You should provide a name property')
    .escape(),

  check('email')
    .isString()
    .isEmail()
    .withMessage('Invalid Email Format')
    .notEmpty()
    .withMessage('You should provide an email property')
    .escape(),

  check('handler')
    .isString()
    .isLength({ min: 4 })
    .withMessage('Handler should be at least 4 characters long')
    .notEmpty()
    .withMessage('You should provide a handler property')
    .escape(),

  validate,
];
