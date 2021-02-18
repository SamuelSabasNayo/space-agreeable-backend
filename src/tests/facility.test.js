/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import app from '../app';

process.env.NODE_ENV = 'test';

const { expect } = chai;

const _travelAdminPwd = process.env.ADMIN_PASSWORD;
let token = '';
const id = 1;
let user = '';
let travelAdminToken = '';
describe('facility endpoint', () => {
  before((done) => {
    const users = {
      firstname: 'admin',
      lastname: 'travel',
      email: 'josh@gmail.com',
      password: '@Okayfine123',
      roleId: 2
    };
    chai
      .request(app)
      .post('/user/signup')
      .send(users)
      .then((res) => {
        user = res.body.user_details.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  describe('signin super admin ', () => {
    before((done) => {
      const admin = {
        email: 'spacenomad@gmail.com',
        password: _travelAdminPwd
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
    describe('assign role to user', () => {
      before((done) => {
        const role = {
          name: 'TRAVEL_ADMIN',
          description: 'travel admin'
        };
        chai
          .request(app)
          .post('/roles/create')
          .set('authorization', token)
          .send(role)
          .end((err) => {
            if (err) done(err);
            done();
          });
      });

      describe('create role', () => {
        before((done) => {
          chai
            .request(app)
            .post('/roles/assign')
            .set('authorization', token)
            .send({
              _userId: `${user}`,
              _roleId: '3'
            })
            .end((err) => {
              if (err) done(err);
              done();
            });
        });

        describe('sign in travel admin', () => {
          before((done) => {
            const travelAdminLogin = {
              email: 'josh@gmail.com',
              password: '@Okayfine123'
            };
            chai
              .request(app)
              .post('/user/signin')
              .send(travelAdminLogin)
              .then((res) => {
                travelAdminToken = res.body.token;
                done();
              })
              .catch((err) => {
                done(err);
              });
          });
          describe('add new facility', async () => {
            it('should add new facility', (done) => {
              const data = {
                location: 'test name ',
                address: "test address ev 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .post('/facility')
                .set('authorization', travelAdminToken)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(201);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });
            it('should not add new facility', (done) => {
              const data = {
                locations: 'test name ',
                addresz: "test address ev 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .post('/facility')
                .set('authorization', travelAdminToken)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(422);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });
            it('should not add new facility', (done) => {
              const data = {
                location: 'test name ',
                address: "test address ev 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              const tkn = travelAdminToken.split(' ')[0];
              chai
                .request(app)
                .post('/facility')
                .set('authorization', tkn)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(401);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });
            it('should not add new facility', (done) => {
              const data = {
                location: 'test name ',
                address: "test address ev 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .post('/facility')
                .set('authorization', token)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(401);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });

            it('should not add a facility', (done) => {
              const data = {
                location: 'test  name ',
                address: "test address  ev 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .post('/facility')
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(403);
                  done();
                });
            });

            it('should get single facility', (done) => {
              chai
                .request(app)
                .get(`/facility/${id}`)
                .end((err, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });

            it('should update facility', (done) => {
              const data = {
                location: 'test updated name ',
                address: "test address ev updated 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .put(`/facility/${id}`)
                .set('authorization', travelAdminToken)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });

            it('should not update facility', (done) => {
              const data = {
                location: 'test updated name ',
                address: "test address ev updated 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .put('/facility/120')
                .set('authorization', travelAdminToken)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(404);
                  done();
                });
            });
            it('should not update facility', (done) => {
              const data = {
                location: 'test updated name ',
                address: "test address ev updated 32'st",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{sdlksldks:sdsds,sdsdsds:sdksjdskdj}'
              };
              chai
                .request(app)
                .put('/facility/1kl')
                .set('authorization', travelAdminToken)
                .send(data)
                .end((err, response) => {
                  expect(response).to.have.status(404);
                  done();
                });
            });

            it('should delete facility', (done) => {
              chai
                .request(app)
                .delete(`/facility/${id}`)
                .set('authorization', travelAdminToken)
                .end((err, response) => {
                  expect(response).to.have.status(200);
                  done();
                });
            });

            it('should not delete facility', (done) => {
              chai
                .request(app)
                .delete('/facility/100')
                .set('authorization', travelAdminToken)
                .end((err, response) => {
                  expect(response).to.have.status(404);
                  done();
                });
            });

            it('should not delete facility', (done) => {
              chai
                .request(app)
                .delete('/facility/10-2')
                .set('authorization', travelAdminToken)
                .end((err, response) => {
                  expect(response).to.have.status(404);
                  done();
                });
            });

            it('should get all the facility', (done) => {
              chai
                .request(app)
                .get('/facility')
                .end((err, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });

            it('should not get single facility', (done) => {
              chai
                .request(app)
                .get('/facility/120')
                .end((err, response) => {
                  expect(response).to.have.status(404);
                  done();
                });
            });
          });
        });
      });
    });
  });
});
