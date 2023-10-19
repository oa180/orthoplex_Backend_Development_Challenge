import AppError from '../../middlewares/error/appError.js';
import catchAsync from '../../utils/catchAsync.js';
import prisma from '../../../Database/prisma/prismClient.js';
import argon from 'argon2';
import Response from '../../utils/response.js';
import { createToken, verifyToken } from './jwt.js';
import { getUserById } from '../User/userController.js';
export const signUserIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError('Please provide a valid eamil and password!', 400)
    );

  // NOTE seperate the find user logic
  const foundedUser = await prisma.user.findUnique({ where: { email } });

  if (!foundedUser) return next(new AppError('Wrong Email or Password!', 403));

  const isUserPasswordVerified = await verifyPassword(
    foundedUser.password,
    password
  );

  if (!isUserPasswordVerified)
    return next(new AppError('Wrong Email or Password!', 403));

  const jwtPayload = {
    id: foundedUser.id,
    handler: foundedUser.handler,
  };

  const token = createToken(jwtPayload);

  if (!token)
    return next(
      new AppError('Something went wrong. Couldnot create user token!', 500)
    );

  Response(res, 'User Logged In Successfully.', 200, {
    token,
  });
});

export const authenticateUser = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  )
    return next(new AppError('No token found. cannot sign you in!', 401));

  /**
   * The token comes in this from => Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
   * So, I split it by space which returns an array with the token it self in index [1]
   */
  const token = req.headers.authorization.split(' ')[1];
  if (!token)
    return next(new AppError('No token found. cannot sign you in!', 401));

  const decodedPayload = await verifyToken(token);

  // NOTE Seperate find user logic
  const tokenOwner = await prisma.user.findUnique({
    where: { id: decodedPayload.id },
  });
  console.log(
    '🚀 ~ file: authController.js:67 ~ authenticateUser ~ tokenOwner:',
    tokenOwner
  );

  if (!tokenOwner)
    return next(
      new AppError('User belongs to this token is no longer exists!', 401)
    );

  console.log(
    checkUserChangedPasswordAfterTokenGenerated(
      tokenOwner.changedAt,
      decodedPayload.iat
    )
  );

  if (
    checkUserChangedPasswordAfterTokenGenerated(
      tokenOwner.changedAt,
      decodedPayload.iat
    )
  )
    return next(
      new AppError(
        'User changed his password after token is created, please login again!',
        401
      )
    );

  req.user = tokenOwner;
  next();
});

const verifyPassword = async (hashedPassword, userPassword) => {
  if (!hashedPassword || !userPassword)
    throw new AppError(
      'Hashed Password or User Password or both of them are missing!',
      500
    );

  try {
    return await argon.verify(hashedPassword, userPassword);
  } catch (error) {
    throw new AppError('Something went wrong', 500);
  }
};

const checkUserChangedPasswordAfterTokenGenerated = (
  userPasswordChangedAt = 0,
  tokenInitiatedTime = 0
) => {
  try {
    if (userPasswordChangedAt == 0 || tokenInitiatedTime == 0)
      throw new AppError(
        "User's password changed at or token initiated or both of them at are missing!",
        500
      );

    if (!userPasswordChangedAt) return false;

    const TIME_STAMP_TO_MILLISECONDS = 1000;
    userPasswordChangedAt = parseInt(
      userPasswordChangedAt.getTime() / TIME_STAMP_TO_MILLISECONDS,
      10
    );

    return userPasswordChangedAt > tokenInitiatedTime;
  } catch (error) {
    throw error;
  }
};
