import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../database/models';

const { User } = models;

chai.use(http);
const { expect } = chai;
const { ADMIN_PASSWORD } = process.env;

let token = '';
let roleId = '';
describe('Roles', () => {
  before((done) => {
    const admin = {
      email: 'spacenomad@gmail.com',
      password: ADMIN_PASSWORD
    };
    chai
      .request(app)
      .post('/user/signin')
      .send(admin)
      .then((res) => {
        token = res.body.token;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  describe(' GET /roles', () => {
    it('should return all roles in the system', (done) => {
      chai
        .request(app)
        .get('/roles')
        .set('authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(200);
          expect(res.body).have.property('roles');
          expect(res.body.message).to.match(/Roles found in system/i);
          done();
        });
    });
  });
  describe('POST /roles/create', () => {
    it('should return 400 if one field is missing', (done) => {
      const newRole = {
        name: 'TRAVEL_ADMIN',
        description: ''
      };
      chai
        .request(app)
        .post('/roles/create')
        .set('authorization', token)
        .send(newRole)
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(400);
          expect(res.body).has.property('message');
          expect(res.body.message).to.match(/is not allowed to be empty/i);
          done();
        });
    });
    it('should create new role', (done) => {
      const newRole = {
        name: 'TRAVEL_ADMIN',
        description: 'This is the Travel Admin of the site!'
      };
      chai
        .request(app)
        .post('/roles/create')
        .set('authorization', token)
        .send(newRole)
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(201);
          expect(res.body).has.property('newRole');
          expect(res.body.message).to.match(/Role created successfully!/i);
          done();
        });
    });
  });
  describe('POST /roles/assign', () => {
    let user = '';
    before((done) => {
      chai.request(app)
        .post('/user/signup')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@gmail.com',
          password: 'JohnDoe1&2'
        })
        .end((err, res) => {
          if (err) done(err);
          user = res.body.user_details.id;
          done();
        });
    });
    it('should return 400 if one field is missing', (done) => {
      chai
        .request(app)
        .post('/roles/assign')
        .set('authorization', token)
        .send({
          _userId: user,
          _roleId: ''
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(400);
          expect(res.body).has.property('message');
          expect(res.body.message).to.match(/is not allowed to be empty/i);
          done();
        });
    });
    it('should assign role to a user', (done) => {
      chai
        .request(app)
        .post('/roles/assign')
        .set('authorization', token)
        .send({
          _userId: `${user}`,
          _roleId: '2'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(200);
          expect(res.body).has.property('message');
          expect(res.body.message).to.match(/Role assigned successfully/i);
          done();
        });
    });
  });
  describe('GET/{id} /roles/id', () => {
    it('should return 404 if no role found with the given id', (done) => {
      roleId = 10;
      chai.request(app)
        .get(`/roles/${roleId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(404);
          done();
        });
    });
    it('should return a single role', async () => {
      const newUser = await User.findAll();
      roleId = newUser[0].dataValues.roleId;
      await chai.request(app)
        .get(`/roles/${roleId}`)
        .set('authorization', token)
        .then((res) => {
          expect(res).has.status(200);
          expect(res.body).to.have.property('singleRole');
          expect(res.body.message).to.match(/Role found in the system/i);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  });
  describe('PUT /roles/id', () => {
    it('should return 400 if one field is missing', async () => {
      const newRole = {
        name: 'MANAGER',
        description: ''
      };
      const newUser = await User.findAll();
      roleId = newUser[1].dataValues.id;
      await chai
        .request(app)
        .put(`/roles/${roleId}`)
        .set('authorization', token)
        .send(newRole)
        .then((res) => {
          expect(res).has.status(400);
          expect(res.body).has.property('message');
          expect(res.body.message).to.match(/is not allowed to be empty/i);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
    it('should return 404 if no role to update found', (done) => {
      const newRole = {
        name: 'MANAGER',
        description: 'This is the Manager who is in charge of all management stuffs!'
      };
      roleId = 10;
      chai.request(app)
        .put(`/roles/${roleId}`)
        .set('authorization', token)
        .send(newRole)
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(404);
          expect(res.body.message).to.match(/No role found with such id/i);
          done();
        });
    });
    it('should return 403 if role is SUPER_ADMIN', async () => {
      const newRole = {
        name: 'MANAGER',
        description: 'This is the Manager who is in charge of all management stuffs!'
      };
      const newUser = await User.findAll();
      roleId = newUser[0].dataValues.roleId;
      await chai.request(app)
        .put(`/roles/${roleId}`)
        .set('authorization', token)
        .send(newRole)
        .then((res) => {
          expect(res).has.status(403);
          expect(res.body.message).to.match(/SUPER_ADMIN role connot be updated!/i);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
    it('should update a specified role', async () => {
      const newRole = {
        name: 'MANAGER',
        description: 'This is the Manager who is in charge of all management stuffs!'
      };
      const newUser = await User.findAll();
      roleId = newUser[1].dataValues.id;
      await chai.request(app)
        .put(`/roles/${roleId}`)
        .set('authorization', token)
        .send(newRole)
        .then((res) => {
          expect(res).has.status(200);
          expect(res.body).to.have.property('roleToUpdate');
          expect(res.body.message).to.match(/Role updated successfully/i);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  });
  describe('DELETE /roles/id', () => {
    it('should return 404 if no role to delete found', (done) => {
      roleId = 10;
      chai.request(app)
        .delete(`/roles/${roleId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res).has.status(404);
          expect(res.body.message).to.match(/No role found with such id/i);
          done();
        });
    });
    it('should return 403 if role is SUPER_ADMIN', async () => {
      const newUser = await User.findAll();
      roleId = newUser[0].dataValues.roleId;
      await chai.request(app)
        .delete(`/roles/${roleId}`)
        .set('authorization', token)
        .then((res) => {
          expect(res).has.status(403);
          expect(res.body.message).to.match(/SUPER_ADMIN role cannot be deleted/i);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
    it('should delete a specified role', async () => {
      const newUser = await User.findAll();
      roleId = newUser[1].dataValues.id;
      roleId = 6;
      await chai.request(app)
        .delete(`/roles/${roleId}`)
        .set('authorization', token)
        .then((res) => {
          expect(res).has.status(404);
          expect(res.body).to.have.property('message');
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  });
});