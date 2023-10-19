import catchAsync from '../../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../../middlewares/error/appError.js';

export const createToken = payload => {
  try {
    if (!payload)
      throw new AppError('Payload is missing at create token function!', 500);

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return jwtToken;
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

export const verifyToken = async token => {
  try {
    if (!token)
      throw new AppError('Token is missing at verify token function!', 500);

    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    return decodedPayload;
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
