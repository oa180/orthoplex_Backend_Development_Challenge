import catchAsync from '../../utils/catchAsync.js';
import prisma from '../../../Database/prisma/prismClient.js';
import AppError from '../../middlewares/error/appError.js';
import Response from '../../utils/response.js';
import argon from 'argon2';
import { ApiFeatures } from '../../utils/api-featuresjs.js';

export const createNewUser = catchAsync(async (req, res, next) => {
  const { name, email, handler, password } = req.body;

  const hashedPassword = await hashUserPassword(next, password);

  if (!hashedPassword)
    return next(new AppError('Failed to hash user password!', 500));

  const newUser = await prisma.user.create({
    data: { name, email, handler, password: hashedPassword },
    select: {
      id: true,
      email: true,
      name: true,
      handler: true,
    },
  });

  Response(res, 'New User Created.', 201, newUser);
});

export const updateUserById = catchAsync(async (req, res, next) => {
  const requstCopy = { ...req.body };

  if (requstCopy.password) {
    delete requstCopy.password;
    return next(
      new AppError('Cannot update password using this endpoint!', 400)
    );
  }

  const userId = req.params.id;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { ...requstCopy },
    select: {
      id: true,
      email: true,
      name: true,
      handler: true,
    },
  });

  Response(res, 'User Updated Successfull.', 200, updatedUser);
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    prisma.user.findMany(),
    req.query
  ).paginate();

  const foundedUsers = (await features).prismaQuery;

  if (foundedUsers.length == 0)
    return next(new AppError('No users found!', 404));

  Response(res, 'Users found.', 200, foundedUsers);
});

export const getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const foundedUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      handler: true,
    },
  });

  if (!foundedUser)
    return next(new AppError('No user found with this ID!', 404));

  Response(res, 'User Found.', 200, foundedUser);
});

export const deleteUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    return next(new AppError('Falied to delete user, user not found!', 404));
  }

  Response(res, 'User deleted successfully!', 204);
});

const hashUserPassword = async (next, userPassword) => {
  try {
    if (!next || !userPassword) return;

    return await argon.hash(userPassword);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
