/* eslint-disable import/no-named-as-default */
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import model from '../database/models';

use(chaiHttp);

const { ADMIN_PASSWORD } = process.env;

let tokenManager = '',
  tokenUser = '',
  userId = '',
  time;

describe('REQUEST Endpoints', () => {
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
            lastname: 'User2',
            email: 'user2@bn.com',
            password: 'Test123.',
            gender: 'Female',
            origin: 'Angola',
            age: 2021,
            identification_type: 'Passport',
            identification_number: 'PC 321211'
          });
        tokenUser = res.body.token;
        userId = res.body.user_details.id;
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
                email: 'user2@bn.com',
                password: 'Test123.'
              });
            tokenUser = res.body.token;
          });

          describe('Create a hotel', () => {
            before(async () => {
              const res = await request(app)
                .post('/hotels')
                .set('authorization', tokenUser)
                .send({
                  hotelname: 'UBUMWE',
                  pricerange: '$280',
                  location: 'Kigali',
                  ranking: '3 star',
                  images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
                  hotelemail: 'five@yahoo.com'
                });
              expect(res.status).to.equal(201);
            });

            describe('Create a room', () => {
              let hotelId;
              let hotelName;
              before(async () => {
                const hotel = await model.hotel.findAll();
                hotelId = hotel[0].dataValues.id;
                hotelName = hotel[0].dataValues.hotelname;
                const res = await request(app)
                  .post('/hotels/rooms')
                  .set('authorization', tokenUser)
                  .send({
                    hotelId,
                    description: 'Room for VIP',
                    roomType: 'Single Room',
                    roomLabel: 'label 003',
                    status: 'Triple',
                    price: '100$-140$',
                    roomImage: 'https://www.images.com/image.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                  });
                expect(res).to.have.status(200);
              });

              describe('POST /requests', () => {
                it('Should create a request', async () => {
                  const res = await request(app)
                    .post('/requests')
                    .set('authorization', tokenUser)
                    .send({
                      hotelName,
                      idRoom: 1,
                      dateStart: '2021-01-08',
                      dateEnd: '2021-01-19'
                    });
                  expect(res).to.have.status(201);
                });

                it('Should not create a request with empty dateStart', async () => {
                  const res = await request(app)
                    .post('/requests')
                    .set('authorization', tokenUser)
                    .send({
                      idRoom: 1,
                      dateStart: '',
                      dateEnd: '2021-01-19'
                    });
                  expect(res).to.have.status(400);
                });

                it('Should not create a request with unexisting idRoom', async () => {
                  const res = await request(app)
                    .post('/requests')
                    .set('authorization', tokenUser)
                    .send({
                      hotelName,
                      idRoom: 100,
                      dateStart: '2021-01-19',
                      dateEnd: '2021-02-19'
                    });
                  expect(res).to.have.status(403);
                  expect(res.body).to.have.property('message');
                });
              });

              describe('GET /requests', () => {
                it('Should get all requests', async () => {
                  const res = await request(app)
                    .get('/requests')
                    .set('authorization', tokenUser);
                  expect(res).to.have.status(200);
                });

                describe('GET /requests/stats', () => {
                  it('Should get request statistics', async () => {
                    time = 30;
                    const res = await request(app)
                      .get(`/requests/stats?time=${time}`)
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(200);
                  });

                  it('Should not get request statistics', async () => {
                    time = -1;
                    const res = await request(app)
                      .get(`/requests/stats?time=${time}`)
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(403);
                  });

                  it('Should not get request statistics', async () => {
                    time = '-10';
                    const res = await request(app)
                      .get(`/requests/stats?time=${time}`)
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(403);
                  });
                });

                describe('GET/:id /requests/:id', () => {
                  it('Should get one request', async () => {
                    const res = await request(app)
                      .get('/requests/12')
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(200);
                  });

                  it('Should not get one request', async () => {
                    const res = await request(app)
                      .get('/requests/2')
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(404);
                  });
                });

                describe('UPDATE/:id /requests/:id', () => {
                  it('Should update a request', async () => {
                    const res = await request(app)
                      .put('/requests/12')
                      .set('authorization', tokenUser)
                      .send({
                        idRoom: 3,
                        dateStart: '2022-01-08',
                        dateEnd: '2022-01-19'
                      });
                    expect(res).to.have.status(200);
                  });

                  it('Should not update a request', async () => {
                    const res = await request(app)
                      .put('/requests/1')
                      .set('authorization', tokenUser)
                      .send({
                        idRoom: 3,
                        dateStart: '2022-01-08',
                        dateEnd: '2022-01-19'
                      });
                    expect(res).to.have.status(404);
                  });
                });

                describe('DELETE/:id /requests/:id', () => {
                  it('Should delete a request', async () => {
                    const res = await request(app)
                      .delete('/requests/12')
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(200);
                  });
                  it('Should not delete a request', async () => {
                    const res = await request(app)
                      .delete('/requests/0')
                      .set('authorization', tokenUser);
                    expect(res).to.have.status(404);
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
