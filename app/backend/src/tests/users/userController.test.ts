import request from 'supertest';
import server from '../../server';
import UserController from '../../controllers/UserController';
import UserService from '../../services/UserService';
import UserModel from '../../models/User';
import { validUser } from './mocks';

jest.mock('../../services/UserService');
jest.mock('../../models/User');

const modelMock = UserModel as jest.Mock<UserModel>;
const serviceMock = UserService as jest.Mock<UserService>;

const model = new modelMock() as jest.Mocked<UserModel>;
const service = new serviceMock(model) as jest.Mocked<UserService>;
const controller = new UserController(service);

describe('Testing GET /users endpoint', () => {
  describe('Testing read route', () => {
    it('should return http status 200', async () => {
      const res = await request(server.getApp()).get('/users');
      expect(res.status).toBe(200);
    });
  });

  describe('Testing read one route', () => {
    it('should return a validation error', async () => {
      const res = await request(server.getApp()).get('/users/7');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Id param must be an uuid string!');
    });

    it('should return http status 200', async () => {
      const res = await request(server.getApp()).get(
        '/users/f70cb4ce-942a-4d9e-9655-1bff11746548'
      );
      expect(res.status).toBe(200);
    });
  });
});

describe('Testing POST /users endpoint', () => {
  describe('Sending an invalid user', () => {
    it('should return http status 400 and name field message', async () => {
      const res = await request(server.getApp()).post('/users').send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Name field must be filled');
    });

    it('should return http status 400 and email field message', async () => {
      const res = await request(server.getApp()).post('/users').send({
        name: 'user',
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email field must be filled');
    });

    it('should return http status 400 and password field message', async () => {
      const res = await request(server.getApp()).post('/users').send({
        name: 'user',
        email: 'user@user.com',
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Password field must be filled');
    });
  });
});

describe('Testing PATCH users/:id/update-profile enpoint', () => {
  describe('Sending an invalid request', () => {
    it('should return http status 400 and an id params message', async () => {
      const res = await request(server.getApp()).patch(
        '/users/7/update-profile'
      );
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Id param must be an uuid string!');
    });

    it('should return http status 400 and name field message', async () => {
      const res = await request(server.getApp())
        .patch('/users/f70cb4ce-942a-4d9e-9655-1bff11746548/update-profile')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Name field must be filled');
    });

    it('should return http 400 and optional email field message', async () => {
      const res = await request(server.getApp())
        .patch('/users/f70cb4ce-942a-4d9e-9655-1bff11746548/update-profile')
        .send({ name: 'users', email: 'user.com' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        'Email field must follow the email pattern. e.g user@user.com'
      );
    });

    it('should return http 400 and optional password field message', async () => {
      const res = await request(server.getApp())
        .patch('/users/f70cb4ce-942a-4d9e-9655-1bff11746548/update-profile')
        .send({ name: 'users', email: 'user@user.com', password: '123456' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        'Password field must have at leats 8 characters length'
      );
    });
  });

  describe('Sending a valida request', () => {
    it('should return http status 200', async () => {
      const res = await request(server.getApp())
        .patch('/users/f70cb4ce-942a-4d9e-9655-1bff11746548/update-profile')
        .send({ name: 'user' });
      expect(res.status).toBe(200);
    });
  });
});

describe('Testing DELETE /users/:id endpoint', () => {
  it('should return http status 204', async () => {
    const res = await request(server.getApp()).delete(
      '/users/f70cb4ce-942a-4d9e-9655-1bff11746548'
    );
    expect(res.status).toBe(204);
  });
});
