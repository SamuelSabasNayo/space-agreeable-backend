/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import app from '../app';

process.env.NODE_ENV = 'test';
const { expect } = chai;
const adminPassword = process.env.ADMIN_PASSWORD;
let token;
let user;
let travelAdminToken;
let facilityId;
let feedbackId;
describe('Facility Feedback EndPoints', () => {
  before((done) => {
    const users = {
      firstname: 'john',
      lastname: 'doe',
      email: 'johndoe1@gmail.com',
      password: 'test@123',
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
        password: adminPassword
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
    describe('create a travel admin', () => {
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
  describe('Assign role to travel admin', () => {
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
              email: 'johndoe1@gmail.com',
              password: 'test@123'
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
                location: 'Test location',
                address: "Test address",
                images: 'testImg.jpg',
                roomNumber: '43',
                roomDetails: '{Location test details}'
              };
              chai
                .request(app)
                .post('/facility')
                .set('authorization', travelAdminToken)
                .send(data)
                .end((err, response) => {
                  facilityId = response.body._facility.id;
                  expect(response).to.have.status(201);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });
         });
        describe('Facility Feedback APIs', () => {
          it('It should send a feedback', (done) => {
            const data = {
              feedback_title: "Testing the feedback",
              feedback_content: "This is the dummy feedback content"
            };
            chai
              .request(app)
              .post(`/facility/${facilityId}/feedback`)
              .set('authorization', travelAdminToken)
              .send(data)
              .end((err, response) => {
                feedbackId = response.body.feedback.id;
                expect(response).to.have.status(201);
                expect(response.body).to.be.an('object');
                done();
              });
          });
          it('It should fail if one field is missing', (done) => {
            const data = {
              feedback_content: "This is the dummy feedback content"
            };
            chai
              .request(app)
              .post(`/facility/${facilityId}/feedback`)
              .set('authorization', travelAdminToken)
              .send(data)
              .end((err, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.be.an('object');
                done();
              });
          });
          });
          describe('GET feedback By Id', () => {
            it('It should get feedback by Id', (done) => {
              chai
                .request(app)
                .get(`/facility/${facilityId}/feedback/${feedbackId}`)
                .end((err, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });
            })
            describe('GET feedback By facility Id', () => {
              it('It should get feedback by feedback Id', (done) => {
                chai
                  .request(app)
                  .get(`/facility/${facilityId}/feedback`)
                  .end((err, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');
                    done();
                  });
              });
              });
            describe('UPDATE feedback status', () => {
                it('It should update the feedback status as seen', (done) => {
                  chai
                    .request(app)
                    .put(`/facility/${facilityId}/feedback/${feedbackId}`)
                    .set('authorization', travelAdminToken)
                    .end((err, response) => {
                      expect(response).to.have.status(200);
                      expect(response.body).to.be.an('object');
                      expect(response.body.message).to.match(/Feedback marked as seen/i);
                      done();
                    });
                });
                })
                describe('UPDATE feedback status', () => {
                  it('It should update the feedback status as not seen', (done) => {
                    chai
                      .request(app)
                      .put(`/facility/${facilityId}/feedback/${feedbackId}`)
                      .set('authorization', travelAdminToken)
                      .end((err, response) => {
                        expect(response).to.have.status(200);
                        expect(response.body).to.be.an('object');
                        expect(response.body.message).to.match(/Feedback marked as not seen/i);
                        done();
                      });
                  });
                  })
               describe('DELETE feedback', () => {
                it('It should delete the feedback', (done) => {
                  chai
                    .request(app)
                    .delete(`/facility/${facilityId}/feedback/${feedbackId}`)
                    .set('authorization', travelAdminToken)
                    .end((err, response) => {
                      expect(response).to.have.status(200);
                      done();
                    });
                });
             })
        });
      });
    });
  });
});



