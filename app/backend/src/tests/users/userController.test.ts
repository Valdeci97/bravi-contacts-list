import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import server from '../../server';
import UserService from '../../services/UserService';
import UserModel from '../../models/User';
import {
  createdUser,
  updatedUser,
  users,
  validUser,
  VALID_TOKEN,
} from './mocks';

const service = new UserService();
const model = new UserModel();

chai.use(chaiHttp);

describe('Testing GET /users endpoints', () => {
  let res: Response;

  describe('should return an array with users', () => {
    before(async () => {
      sinon.stub(service, 'list').resolves(users);
      sinon.stub(model, 'list').resolves(users);
    });

    after(() => {
      (service.list as sinon.SinonStub).restore();
      (model.list as sinon.SinonStub).restore();
    });
    it('should have http status code 200', async () => {
      res = await chai.request(server.getApp()).get('/users');
      expect(res.status).to.be.equal(200);
    });
  });

  // describe('should return right user information', () => {
  //   before(async () => {
  //     sinon.stub(service, 'listById').resolves(users[0]);
  //     sinon.stub(model, 'listById').resolves(users[0]);
  //   });

  //   after(() => {
  //     (service.listById as sinon.SinonStub).restore();
  //     (model.listById as sinon.SinonStub).restore();
  //   });

  //   it('should have http status code 200', async () => {
  //     res = await chai
  //       .request(server.getApp())
  //       .get(`/users/f70cb4ce-942a-4d9e-9655-1bff11746548`);
  //     expect(res.status).to.be.equal(200);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body).to.have.own.property('user');
  //     expect(res.body.user).to.have.all.keys('id', 'email', 'name');
  //   });
  // });

  describe('should return an error', () => {
    it('should have http status code 400', async () => {
      res = await chai.request(server.getApp()).get('/users/7');
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.own.property('message');
      expect(res.body.message).to.be.equal('Id param must be an uuid string!');
    });
  });
});

describe('Testing POST /users endpoint', () => {
  let res: Response;
  describe('should create an user successfully', () => {
    before(async () => {
      sinon.stub(service, 'create').resolves(createdUser);
      sinon.stub(model, 'findByEmail').resolves(null);
      sinon.stub(model, 'create').resolves(createdUser);
    });

    after(() => {
      (service.create as sinon.SinonStub).restore();
      (model.findByEmail as sinon.SinonStub).restore();
      (model.create as sinon.SinonStub).restore();
    });

    it('should have http status 201', async () => {
      res = await chai.request(server.getApp()).post('/users').send(validUser);
      expect(res.status).to.equal(201);
    });
  });

  describe('should return an error', () => {
    it('should have htpp status 400 and an error message', async () => {
      res = await chai.request(server.getApp()).post('/users').send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.own.property('message');
      expect(res.body.message).to.equal('Name field must be filled');
    });
  });

  describe('should return an error', () => {
    it('should have htpp status 400 and an error message', async () => {
      res = await chai.request(server.getApp()).post('/users').send({
        name: 'usuário teste',
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.own.property('message');
      expect(res.body.message).to.equal('Email field must be filled');
    });
  });

  describe('should return an error', () => {
    it('should have htpp status 400 and an error message', async () => {
      res = await chai.request(server.getApp()).post('/users').send({
        name: 'usuário teste',
        email: 'user@user.com.br',
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.own.property('message');
      expect(res.body.message).to.equal('Password field must be filled');
    });
  });

  describe('Testing PATCH /users/:id/update-profile route', () => {
    before(async () => {
      sinon.stub(service, 'listById').resolves(createdUser);
      sinon.stub(service, 'update').resolves(updatedUser);
      sinon.stub(model, 'update').resolves(updatedUser);
    });

    after(() => {
      (service.listById as sinon.SinonStub).restore();
      (service.update as sinon.SinonStub).restore();
      (model.update as sinon.SinonStub).restore();
    });

    it('should have http status 200', async () => {
      res = await chai
        .request(server.getApp())
        .patch(`/users/f70cb4ce-942a-4d9e-9655-1bff11746548/update-profile`)
        .send({
          name: 'usuário novo da silva',
        });
    });
  });

  // describe('Testing DELETE /users/:id route', () => {
  //   before(async () => {
  //     sinon.stub(service, 'listById').resolves(users[0]);
  //     sinon.stub(service, 'destroy').resolves(undefined);
  //     sinon.stub(model, 'destroy').resolves(undefined);
  //   });

  //   after(() => {
  //     (service.listById as sinon.SinonStub).restore();
  //     (service.destroy as sinon.SinonStub).restore();
  //     (model.destroy as sinon.SinonStub).restore();
  //   });

  //   it('should have http status 204', async () => {
  //     res = await chai
  //       .request(server.getApp())
  //       .delete(`/users/f70cb4ce-942a-4d9e-9655-1bff11746548}`);
  //     expect(res.status).to.equal(204);
  //   });
  // });
});
