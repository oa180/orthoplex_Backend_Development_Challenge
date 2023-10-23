import { createToken, verifyToken } from '../modules/Authentication/jwt.js';
import { AppError } from '../middlewares/error/appError.js';

jest.mock('jsonwebtoken');

import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'jwt-secret';
process.env.JWT_EXPIRES_IN = '1h';

jest.mock('../middlewares/error/appError.js', () => {
  return class AppError {
    constructor(message, statusCode) {
      this.message = message;
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
    }
  };
});

describe('create token function', () => {
  beforeEach(() => {
    jwt.sign.mockReset();
  });

  it('should return jsonwebtoken if payload provided', () => {
    const payload = { id: '1', handler: 'test123' };
    jwt.sign = jest.fn(() => 'jwt-token');

    const token = createToken(payload);

    expect(jwt.sign).toHaveBeenCalledWith(payload, 'jwt-secret', {
      expiresIn: '1h',
    });

    expect(token).toBe('jwt-token');
  });

  it('should throw error if there is no payload provided', () => {
    const payload = null;

    expect(() => createToken(payload)).toThrow(
      'Payload is missing at create token function!'
    );
  });
});

// describe.only('verify token function', () => {
//   beforeEach(() => {
//     jwt.verify.mockReset();
//   });

//   it('should throw an error if no token is provided', async () => {
//     const token = null;

//     expect(async () => {
//       await verifyToken(token);
//     }).rejects.toThrow('Token is missing at verify token function!');
//   });
// });
