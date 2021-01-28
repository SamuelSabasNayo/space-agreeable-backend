/* eslint-disable prefer-const */
/* eslint-disable object-curly-newline */
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import { sign } from 'jsonwebtoken';
// import { config } from 'dotenv';
import app from '../app';

use(chaiHttp);

// config();

const { ADMIN_PASSWORD } = process.env;

let tokenAdmin = '',
  tokenManager = '',
  tokenManager1 = '',
  tokenUser = '',
  managerId = '',
  userId = '';

tokenManager1 = sign({ id: 2, firstname: 'backend', lastname: 'Manager', email: 'backendmanager@bn.com', password: 'HelloWorld!', roleId: 4, name: 'MANAGER' }, process.env.JWT_KEY, { expiresIn: '2h' });

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

    // describe('Create a Travel Adimn Role', () => {
    //   before(async () => {
    //     const res = await request(app)
    //       .post('/roles/create')
    //       .set('authorization', tokenAdmin)
    //       .send({
    //         name: 'TRAVEL_ADMIN',
    //         description: 'This is manager role.'
    //       });

    //     expect(res).has.status(201);
    //   });

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

            // userId = res.body.roles[2].id;
            console.log(res.body);
            // console.log(userId);
            expect(res).has.status(200);
          });

          describe('Signin Manager', () => {
            before(async () => {
              const res = await request(app)
                .post('/user/signin')
                .send({
                  email: 'backendmanager@bn.com',
                  password: 'BTest123.'
                });

              console.log(res.body);
              managerId = res.body.id;
              console.log(managerId);
              tokenManager = res.body.token;
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

                console.log(userId);
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

                    // console.log(res.body);
                    // managerId = res.body.id;
                    // console.log(managerId);
                    tokenUser = res.body.token;
                  });
                  describe('User creates a hotel', () => {
                    before(async () => {
                      const res = await request(app)
                        .post('/hotels')
                        .set('authorization', tokenUser)
                        .send({
                          hotelname: 'Marriott Hotel',
                          pricerange: '$320',
                          location: 'Kigali',
                          ranking: '5 star',
                          parking: 'Yes',
                          wifi: 'Yes',
                          swimmingpool: 'Yes',
                          breakfast: 'Yes',
                          rooms: ['Double rooms', 'Single rooms', 'complex rooms'],
                          images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
                          hotelemail: 'infos@marriott.com'
                        });

                      console.log(res.body);
                      expect(res).to.have.status(201);
                    });

                    describe('User creates a room', () => {
                      before(async () => {
                        const res = await request(app)
                          .post('/rooms')
                          .set('authorization', tokenUser)
                          .send({
                            hotelId: 2,
                            description: 'Room for VIP',
                            roomType: 'first class',
                            roomLabel: 'label 001',
                            status: 'double',
                            price: '200$-300$',
                            roomImage: 'https://www.images.com/image.png',
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          });

                        console.log(res.body);
                        expect(res).to.have.status(200);
                      });

                      describe('User creates a request', () => {
                        before(async () => {
                          const res = await request(app)
                            .post('/Request')
                            .set('authorization', tokenUser)
                            .send({
                              idRoom: 1,
                              dateStart: '2021-01-29',
                              dateEnd: '2021-01-30'
                            });

                          console.log(res.body);
                          expect(res).to.have.status(201);
                        });

                        describe('GET /manager/requests', () => {
                          it('Manager should get all requests', async () => {
                            const res = await request(app)
                              .get('/manager/requests')
                              .set('authorization', tokenManager);

                            console.log(res.body);
                            expect(res).to.have.status(200);
                          });

                          // it('Manager should get "No request found!" message', async () => {
                          //   const res = await request(app)
                          //     .get('/manager/requests')
                          //     .set('authorization', tokenManager);

                          //   expect(res).to.have.status(400);
                          //   expect(res.body.message).to.match(/No request found!/i);
                          // });

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

                        describe('POST /manager/requests', () => {
                          it('Manager should add a request', async () => {
                            const res = await request(app)
                              .post('/manager/requests')
                              .set('authorization', tokenManager)
                              .send({
                                idRoom: 500,
                                dateStart: '2021-01-25',
                                dateEnd: '2021-01-30'
                              });

                            expect(res).to.have.status(201);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Request added successfully!/i);
                          });

                          it('Manager should get "Access denied!" message', async () => {
                            const res = await request(app)
                              .post('/manager/requests')
                              .set('authorization', tokenAdmin)
                              .send({
                                idRoom: 500,
                                dateStart: '2021-01-25',
                                dateEnd: '2021-01-30'
                              });

                            expect(res).to.have.status(400);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.match(/Room is already occupied!/i);
                          });
                        });

                        describe('GET/:id /manager/requests/:id', () => {
                        //   it('Manager should get one request', async () => {
                        //     const res = await request(app)
                        //       .get('/manager/requests/1')
                        //       .set('authorization', tokenManager);

                          //     expect(res).to.have.status(200);
                          //     expect(res.body).to.have.property('message');
                          //     expect(res.body.message).to.match(/Request found successfully!/i);
                          //   });

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
                          it('Manager should update a request', async () => {
                            const res = await request(app)
                              .put('/manager/requests/1')
                              .set('authorization', tokenManager)
                              .send({
                                requestStatus: 'REJECTED',
                                idRoom: 500,
                                dateStart: '2021-01-25',
                                dateEnd: '2021-01-30'
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

// /* eslint-disable prefer-const */
// /* eslint-disable object-curly-newline */
// import { use, request, expect } from 'chai';
// import chaiHttp from 'chai-http';
// import { sign } from 'jsonwebtoken';
// import app from '../app';

// use(chaiHttp);

// const { ADMIN_PASSWORD } = process.env;

// let tokenAdmin = '',
//   tokenManager = '',
//   tokenUser = sign({ firstname: 'User1', lastname: 'Nomad', email: 'user1@bn.com', password: 'HelloWorld!', roleId: 5 }, process.env.JWT_KEY, { expiresIn: '2h' }),
//   userId = '';

// describe('MANAGER Endpoints', () => {
//   // describe('Signup a User', () => {
//   //   before(async () => {
//   //     const res = await request(app)
//   //       .post('/user/signup')
//   //       .send({
//   //         firstname: 'Space',
//   //         lastname: 'Manager',
//   //         email: 'spacemanager@bn.com',
//   //         password: 'Test123.',
//   //         gender: 'Male',
//   //         roleId: '2',
//   //         origin: 'Rwanda',
//   //         profession: 'Software Engineer',
//   //         age: 2021,
//   //         identification_type: 'Passport',
//   //         identification_number: 'PC 321211'
//   //       });

//   //     tokenUser = res.body.token;
//   //     userId = res.body.user_details;
//   //   });

//   // describe('Signin Admin', () => {
//   //   before(async () => {
//   //     const res = await request(app)
//   //       .post('/user/signin')
//   //       .send({
//   //         email: 'spacenomad@gmail.com',
//   //         password: ADMIN_PASSWORD
//   //       });

//   //     tokenAdmin = res.body.token;
//   //   });

//   // describe('Create a Manager Role', () => {
//   //   before(async () => {
//   //     const res = await request(app)
//   //       .post('/roles/create')
//   //       .set('authorization', tokenAdmin)
//   //       .send({
//   //         name: 'MANAGER',
//   //         description: 'This is manager role.'
//   //       });

//   //     expect(res).has.status(201);
//   //   });

//   // describe('Get Roles', () => {
//   //   before(async () => {
//   //     const res = await request(app)
//   //       .get('/roles')
//   //       .set('authorization', tokenAdmin);

//   //     userId = res.body.roles[1].id;
//   //     expect(res).has.status(200);
//   //   });

//   //   describe('Assign Manager Role', () => {
//   //     before(async () => {
//   //       const res = await request(app)
//   //         .post('/roles/assign')
//   //         .set('authorization', tokenAdmin)
//   //         .send({
//   //           _userId: `${userId}`,
//   //           _roleId: `${userId}`
//   //         });

//   //       expect(res).has.status(200);
//   //     });

//   // describe('Signin Manager', () => {
//   //   before(async () => {
//   //     const res = await request(app)
//   //       .post('/user/signin')
//   //       .send({
//   //         email: 'spacemanager@bn.com',
//   //         password: 'Test123.'
//   //       });

//   //     tokenManager = res.body.token;
//   //   });

//   describe('Signin Manager', () => {
//     before(async () => {
//       const res = await request(app)
//         .post('/user/signin')
//         .send({
//           email: 'backendmanager@bn.com',
//           password: 'BTest123.'
//         });

//       console.log(res.body);
//       tokenManager = res.body.token;
//     });

//     describe(

//     describe('GET /manager/requests', () => {
//       it('Manager should get all requests', async () => {
//         const res = await request(app)
//           .get('/manager/requests')
//           .set('authorization', tokenManager);

//         expect(res).to.have.status(200);
//       });

//       it('Manager should get "Access denied!" message', async () => {
//         const res = await request(app)
//           .get('/manager/requests')
//           .set('authorization', tokenUser);

//         expect(res).to.have.status(400);
//         expect(res.body.message).to.match(/Access denied!/i);
//       });

//       it('Manager should get "No role assigned!" message', async () => {
//         const res = await request(app)
//           .get('/manager/requests')
//           .set('authorization', tokenUser);

//         expect(res).to.have.status(400);
//         expect(res.body.message).to.match(/undefined/i);
//       });

//       it('Manager should get "Please login!" message', async () => {
//         const res = await request(app)
//           .get('/manager/requests');

//         expect(res).to.have.status(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.match(/Please login!/i);
//       });

//       it('Manager should get "undefined token" message', async () => {
//         const res = await request(app)
//           .get('/manager/requests')
//           .set('authorization', `auth-token ${tokenUser}bad`);

//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('error');
//         expect(res.body.message).to.match(/undefined/i);
//       });
//     });

//     // describe('POST /manager/requests', () => {
//     //   it('Manager should add a request', async () => {
//     //     const res = await request(app)
//     //       .post('/manager/requests')
//     //       .set('authorization', tokenManager)
//     //       .send({
//     //         idRoom: 500,
//     //         dateStart: '2021-01-25',
//     //         dateEnd: '2021-01-30'
//     //       });

//     //     expect(res).to.have.status(201);
//     //     expect(res.body).to.have.property('message');
//     //     expect(res.body.message).to.match(/Request added successfully!/i);
//     //   });

//     //   it('Manager should get "Access denied!" message', async () => {
//     //     const res = await request(app)
//     //       .post('/manager/requests')
//     //       .set('authorization', tokenAdmin)
//     //       .send({
//     //         idRoom: 500,
//     //         dateStart: '2021-01-25',
//     //         dateEnd: '2021-01-30'
//     //       });

//     //     expect(res).to.have.status(403);
//     //     expect(res.body).to.have.property('message');
//     //     expect(res.body.message).to.match(/Access denied!/i);
//     //   });
//     // });

//     // describe('GET/:id /manager/requests/:id', () => {
//     //   it('Manager should get one request', async () => {
//     //     const res = await request(app)
//     //       .get('/manager/requests/1')
//     //       .set('authorization', tokenManager);

//     //     expect(res).to.have.status(200);
//     //     expect(res.body).to.have.property('message');
//     //     expect(res.body.message).to.match(/Request found successfully!/i);
//     //   });

//     //   it('Manager should get "Request does not exist" message', async () => {
//     //     const res = await request(app)
//     //       .get('/manager/requests/2')
//     //       .set('authorization', tokenManager);

//     //     expect(res).to.have.status(400);
//     //     expect(res.body).to.have.property('message');
//     //     expect(res.body.message).to.match(/Request does not exist./i);
//     //   });

//     //   it('Manager should get "Error" message', async () => {
//     //     const res = await request(app)
//     //       .get('/manager/requests/:id')
//     //       .set('authorization', tokenManager);

//     //     expect(res).to.have.status(500);
//     //     expect(res.body).to.have.property('error');
//     //     expect(res.body.message).to.match(/undefined/i);
//     //   });
//     // });

//     // describe('PUT/:id /manager/requests/:id', () => {
//     //   it('Manager should update a request', async () => {
//     //     const res = await request(app)
//     //       .put('/manager/requests/1')
//     //       .set('authorization', tokenManager)
//     //       .send({
//     //         requestStatus: 'REJECTED',
//     //         idRoom: 500,
//     //         dateStart: '2021-01-25',
//     //         dateEnd: '2021-01-30'
//     //       });

//     //     expect(res).to.have.status(200);
//     //     expect(res.body).to.have.property('message');
//     //     expect(res.body.message).to.match(/Request updated successfully!/i);
//     //   });
//     // });
//     // });
//     // });
//     // });
//     // });
//     // });
//   });
// });

// import { use, request, expect } from 'chai';
// import http from 'chai-http';
// import app from '../app';

// use(http);
// let token = '';
// describe('Testing resetPassword endpoint', () => {
//   before(async () => {
//     const res = await request(app)
//       .post('/user/signup')
//       .send({
//         firstname: 'herve',
//         lastname: 'bardo',
//         telephone: '078945678567',
//         password: '8675rtyfgh'
//       });

//     console.log(res.body);
//     token = res.body.token;
//   });

//   describe('POST /user/resetpassword', () => {
//     it('Should send a link to email', async () => {
//       const res = await request(app)
//         .post('/user/resetpassword')
//         .send({ email: 'hervebarnado@gmail.com'});

//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property('Message');
//       expect(res.body.message).to.match(/Go to this link to reset your password/i);
//     });
//   });

//   describe('PUT /user/resetpassword/:', () => {
//     it('Should update to a new password', async () => {
//       const res = await request(app)
//         .put('/user/resetpassword')
//         .set('authorization', token)
//         .send({ password: 'NEWpasword1.' });

//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property('Message');
//       expect(res.body.message).to.match(/Password was reset successfully/i);
//     });
//   });
// });
