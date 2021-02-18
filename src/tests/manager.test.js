/* eslint-disable import/no-named-as-default */
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import model from '../database/models';

use(chaiHttp);

const { ADMIN_PASSWORD } = process.env;

let tokenAdmin = '',
  tokenManager = '',
  tokenUser = '',
  userId = '',
  time;

describe('MANAGER Endpoints', () => {
  describe('Signin Super Admin', () => {
    before(async () => {
      const res = await request(app)
        .post('/user/signin')
        .send({
          email: 'spacenomad@gmail.com',
          password: ADMIN_PASSWORD
        });

      tokenAdmin = res.body.token;
    });

    describe('Create a Travel Team Member Role', () => {
      before(async () => {
        const res = await request(app)
          .post('/roles/create')
          .set('authorization', tokenAdmin)
          .send({
            name: 'TRAVEL_TEAM_MEMBER',
            description: 'This is manager role.'
          });

        expect(res).has.status(201);
      });
      describe('Create a Requester Role', () => {
        before(async () => {
          const res = await request(app)
            .post('/roles/create')
            .set('authorization', tokenAdmin)
            .send({
              name: 'REQUESTER',
              description: 'This is requester role.'
            });

          expect(res).has.status(201);
        });

        describe('Get Roles', () => {
          before(async () => {
            const res = await request(app)
              .get('/roles')
              .set('authorization', tokenAdmin);

            expect(res).has.status(200);
          });

          describe('Signin Manager', () => {
            before(async () => {
              const res = await request(app)
                .post('/user/signin')
                .send({
                  email: 'backendmanager@bn.com',
                  password: `B${ADMIN_PASSWORD}`
                });
              tokenManager = res.body.token;
              expect(res).to.have.status(200);
            });

            describe('Signup a User', () => {
              before(async () => {
                const res = await request(app)
                  .post('/user/signup')
                  .send({
                    firstname: 'Space',
                    lastname: 'User1',
                    email: 'user1@bn.com',
                    password: 'Test123.',
                    gender: 'Male',
                    origin: 'Rwanda',
                    age: 2021,
                    identification_type: 'Passport',
                    identification_number: 'PC 321211'
                  });
                tokenUser = res.body.token;
                userId = res.body.user_details.id;
              });

              describe('POST /manager/assign', () => {
                it('Manager can assign manager Id', async () => {
                  const res = await request(app)
                    .post('/manager/assign')
                    .set('authorization', tokenManager)
                    .send({
                      _userId: userId,
                      _managerId: 2
                    });

                  expect(res).to.have.status(201);
                  expect(res.body).to.have.property('message');
                  expect(res.body.message).to.match(/Manager Id is assigned successfully!/i);
                });
              });

              describe('Assign manager Id', () => {
                before(async () => {
                  const res = await request(app)
                    .post('/manager/assign')
                    .set('authorization', tokenManager)
                    .send({
                      _userId: userId,
                      _managerId: 2
                    });
                  expect(res).to.have.status(201);
                });

                describe('Sign in User', () => {
                  before(async () => {
                    const res = await request(app)
                      .post('/user/signin')
                      .send({
                        email: 'user1@bn.com',
                        password: 'Test123.'
                      });
                    tokenUser = res.body.token;
                  });

                  describe('User creates a hotel', () => {
                    let hotelId;
                    let hotelName;
                    before(async () => {
                      const res = await request(app)
                        .post('/hotels')
                        .set('authorization', tokenUser)
                        .send({
                          hotelname: 'Marriott',
                          pricerange: '$320',
                          location: 'Kigali',
                          ranking: '5 star',
                          parking: 'Yes',
                          wifi: 'Yes',
                          swimmingpool: 'Yes',
                          breakfast: 'Yes',
                          images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
                          hotelemail: 'infos@marriott.com'
                        });
                      expect(res).to.have.status(201);
                      const hotel = await model.hotel.findAll();
                      hotelId = hotel[0].dataValues.id;
                      hotelName = hotel[0].dataValues.hotelname;
                    });

                    describe('User creates a room', () => {
                      it('Users create a room', async () => {
                        const res = await request(app)
                          .post('/hotels/rooms')
                          .set('authorization', tokenUser)
                          .send({
                            hotelId,
                            description: 'Room for VIP',
                            roomType: 'first class',
                            roomLabel: 'label 001',
                            status: 'double',
                            price: '200$-300$',
                            roomImage: 'https://www.images.com/image.png',
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          });
                        expect(res).to.have.status(200);
                      });

                      it('User creates second room', async () => {
                        const res = await request(app)
                          .post('/hotels/rooms')
                          .set('authorization', tokenUser)
                          .send({
                            hotelId,
                            description: 'Room for VVIP',
                            roomType: 'Double Room',
                            roomLabel: 'label 002',
                            status: 'double',
                            price: '200$-300$',
                            roomImage: 'https://www.images.com/image.png',
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          });

                        expect(res).to.have.status(200);
                      });

                      describe('User creates a request', () => {
                        before(async () => {
                          const res = await request(app)
                            .post('/requests')
                            .set('authorization', tokenUser)
                            .send({
                              hotelName,
                              idRoom: 2,
                              dateStart: '2021-01-29',
                              dateEnd: '2021-01-30'
                            });
                          expect(res).to.have.status(201);
                        });

                        describe('GET /manager/requests', () => {
                          it('Manager should get all requests', async () => {
                            const res = await request(app)
                              .get('/manager/requests')
                              .set('authorization', tokenManager);

                            expect(res).to.have.status(200);
                          });

                          it('Manager should get "Access denied!" message', async () => {
                            const res = await request(app)
                              .get('/manager/requests')
                              .set('authorization', tokenUser);

                            expect(res).to.have.status(400);
                            expect(res.body.message).to.match(/Access denied!/i);
                          });

                          it('Manager should get "Please login!" message', async () => {
                            const res = await request(app)
                              .get('/manager/requests');

                            expect(res).to.have.status(403);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Please login!/i);
                          });

                          it('Manager should get "undefined token" message', async () => {
                            const res = await request(app)
                              .get('/manager/requests')
                              .set('authorization', `auth-token ${tokenUser}bad`);

                            expect(res).to.have.status(400);
                            expect(res.body).to.have.property('error');
                            expect(res.body.message).to.match(/undefined/i);
                          });
                        });

                        describe('GET /manager/requests/stats', () => {
                          it('Manager should get requests statistics', async () => {
                            time = 30;
                            const res = await request(app)
                              .get(`/manager/requests/stats?time=${time}`)
                              .set('authorization', tokenManager);

                            expect(res).to.have.status(200);
                          });

                          it('Manager should not get requests statistics', async () => {
                            time = -30;
                            const res = await request(app)
                              .get(`/manager/requests/stats?time=${time}`)
                              .set('authorization', tokenManager);

                            expect(res).to.have.status(403);
                          });
                        });

                        describe('POST /manager/requests', () => {
                          it('Manager should add a request', async () => {
                            const res = await request(app)
                              .post('/manager/requests')
                              .set('authorization', tokenManager)
                              .send({
                                hotelName,
                                idRoom: 2,
                                dateStart: '2021-01-25',
                                dateEnd: '2021-01-30'
                              });
                            expect(res).to.have.status(201);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request created successfully!/i);
                          });

                          it('Manager should get "Room id does not exist!" message', async () => {
                            const res = await request(app)
                              .post('/manager/requests')
                              .set('authorization', tokenManager)
                              .send({
                                hotelName,
                                idRoom: 500,
                                dateStart: '2021-01-25',
                                dateEnd: '2021-01-30'
                              });
                            expect(res).to.have.status(403);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Room id does not exist!/i);
                          });
                        });

                        describe('GET/:id /manager/requests/:id', () => {
                          it('Manager should get one request', async () => {
                            const res = await request(app)
                              .get('/manager/requests/10')
                              .set('authorization', tokenManager);

                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request found successfully!/i);
                          });

                          it('Manager should get "Request does not exist" message', async () => {
                            const res = await request(app)
                              .get('/manager/requests/2')
                              .set('authorization', tokenManager);

                            expect(res).to.have.status(400);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request does not exist./i);
                          });

                          it('Manager should get "Error" message', async () => {
                            const res = await request(app)
                              .get('/manager/requests/:id')
                              .set('authorization', tokenManager);

                            expect(res).to.have.status(500);
                            expect(res.body).to.have.property('error');
                            expect(res.body.message).to.match(/undefined/i);
                          });
                        });

                        describe('PUT/:id /manager/requests/:id', () => {
                          it('Manager should reject a  request', async () => {
                            const res = await request(app)
                              .put('/manager/requests/1')
                              .set('authorization', tokenManager)
                              .send({
                                requestStatus: 'REJECTED'
                              });
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request updated successfully!/i);
                          });

                          it('Manager should get "Request does not exist" message', async () => {
                            const res = await request(app)
                              .put('/manager/requests/0')
                              .set('authorization', tokenManager)
                              .send({
                                requestStatus: 'REJECTED'
                              });
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request does not exist./i);
                          });
                        });

                        describe('POST/ /manager/requests/', () => {
                          it('Manager should assign managerId', async () => {
                            const res = await request(app)
                              .post('/manager/assign')
                              .set('authorization', tokenManager)
                              .send({
                                _userId: userId,
                                _managerId: 2
                              });

                            expect(res).to.have.status(201);
                          });

                          it('Manager should get "Wrong Manager Id" message', async () => {
                            const res = await request(app)
                              .post('/manager/assign')
                              .set('authorization', tokenManager)
                              .send({
                                _userId: userId,
                                _managerId: 1
                              });
                            expect(res).to.have.status(403);
                          });

                          it('Manager should get "Manager Id does not exist" message', async () => {
                            const res = await request(app)
                              .post('/manager/assign')
                              .set('authorization', tokenManager)
                              .send({
                                _userId: userId,
                                _managerId: 0
                              });
                            expect(res).to.have.status(404);
                          });

                          it('Manager should get "Access denied! to this user" message', async () => {
                            const res = await request(app)
                              .post('/manager/assign')
                              .set('authorization', tokenManager)
                              .send({
                                _userId: 3,
                                _managerId: 2
                              });
                            expect(res).to.have.status(403);
                          });

                          it('Manager should get "User does not exist" message', async () => {
                            const res = await request(app)
                              .post('/manager/assign')
                              .set('authorization', tokenManager)
                              .send({
                                _userId: 0,
                                _managerId: 2
                              });
                            expect(res).to.have.status(404);
                          });
                          it('Manager should approve a request', async () => {
                            const res = await request(app)
                              .put('/manager/requests/1')
                              .set('authorization', tokenManager)
                              .send({
                                requestStatus: 'APPROVED'
                              });
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request updated successfully!/i);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
