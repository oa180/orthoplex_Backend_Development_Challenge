import supertest from 'supertest';
import app from '../app.js';
import { getUserById } from '../modules/User/userController.js';
import prisma from '../../Database/prisma/prismClient.js';

describe('Test User Routes', () => {
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeAll(() => {
    // Replace the Prisma instance with the mockPrisma
    prisma.user.findUnique = mockPrisma.user.findUnique;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get one user route', () => {
    describe('given user deos not exist', () => {
      it('should return 404 not found', async () => {
        mockPrisma.user.findUnique.mockResolvedValue(null);

        const response = await supertest(app).get('/api/user/user123');
        expect(response.status).toBe(404);
      });
    });
  });
});
