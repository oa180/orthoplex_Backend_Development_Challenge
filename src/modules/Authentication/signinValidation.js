import Joi from 'joi';

export const signinValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be string!',
    'string.email': 'Invalid Email Format!',
    'any.required': 'You should provide an email property!',
  }),
  password: Joi.string().min(8).required().messages({
    'string.base': 'Password should be string!',
    'string.min': 'Password should be at least 8 characters length!',
    'any.required': 'You should provide a password property!',
  }),
});
