import Joi from 'joi';

export const createUserValidationSchema = Joi.object({
  name: Joi.string().min(6).required().messages({
    'string.base': 'Name should contains strings only!',
    'string.min': 'Name should be at least 6 characters length!',
    'any.required': 'You should provide a name property!',
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email should be string!',
    'string.email': 'Invalid Email Format!',
    'any.required': 'You should provide an email property!',
  }),

  handler: Joi.string().min(4).required().messages({
    'string.base': 'Handler should be string!',
    'string.min': 'Handler should be at least 6 characters length!',
    'any.required': 'You should provide a handler property!',
  }),

  password: Joi.string().min(8).required().messages({
    'string.base': 'Password should be string!',
    'string.min': 'Password should be at least 8 characters length!',
    'any.required': 'You should provide a password property!',
  }),
});

export const updateUserValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Usesr should be string!',
    'any.required': 'You should provide an user id in the query!',
  }),
  name: Joi.string().min(6).required().messages({
    'string.base': 'Name should contains strings only!',
    'string.min': 'Name should be at least 6 characters length!',
    'any.required': 'You should provide a name property!',
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email should be string!',
    'string.email': 'Invalid Email Format!',
    'any.required': 'You should provide an email property!',
  }),

  handler: Joi.string().min(4).required().messages({
    'string.base': 'Handler should be string!',
    'string.min': 'Handler should be at least 6 characters length!',
    'any.required': 'You should provide a handler property!',
  }),
});
