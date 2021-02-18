/* eslint-disable camelcase */
import chai from 'chai';
import chaiHttp from 'chai-http';
import model from '../database/models';
import { app } from '../app';

process.env.NODE_ENV = 'test';
const { expect } = chai;
chai.use(chaiHttp);

let token;
describe('Rooms', () => {
  before(async () => {
    const res = await chai.request(app)
      .post('/user/signup')
      .send({
        firstname: 'Space',
        lastname: 'User2',
        email: 'testuser@gmail.com',
        password: 'Test123.',
        gender: 'Female',
        origin: 'Angola',
        age: 2021,
        identification_type: 'Passport',
        identification_number: 'PC 321211'
      });
    token = res.body.token;
  });
  describe('post/rooms', () => {
    it('it should  POST a room', async () => {
      const hotelId = 1;
      const hotel = await model.hotel.findOne({
        where: {
          id: hotelId
        }
      });
      if (hotel) {
        chai.request(app)
          .post('/hotels/rooms')
          .set('Authorization', token)
          .send({
            hotelId: 1,
            description: 'Room for underGround',
            roomType: 'First class',
            roomLabel: 'label 001',
            status: 'double',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
          });
      }
    });
  });

  describe('post/rooms', () => {
    it('it should Not POST a room', () => {
      chai.request(app)
        .post('/hotels/rooms')
        .set('Authorization', token)
        .send({
          hotelId: '20',
          description: 'Room for underGround',
          roomType: 'First class',
          roomLabel: 'label 001',
          status: 'double',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
  });

  describe('put/hotels/:hotelId/rooms/:idroom', () => {
    it('should update an existing  room ', () => {
      const idroom = 1;
      const hotelId = 1;
      chai.request(app)
        .put(`/hotels/${hotelId}/rooms/${idroom}`)
        .set('Authorization', token)
        .send({
          description: 'Room for VIP'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
    });
  });

  describe('Put /hotels/:hotelId/rooms/:idroom', () => {
    it('should return 404 if room of specified hotel not found ', () => {
      const idroom = 0;
      const hotelId = 10;
      chai.request(app)
        .put(`/hotels/${hotelId}/rooms/${idroom}`)
        .set('Authorization', token)
        .send({
          description: 'Room for VIP'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
        });
    });
  });
  describe('Get All Rooms of a Particular hotel', () => {
    it('should return an array of the all Rooms of a hotel', (done) => {
      const hotelId = 6;
      chai
        .request(app)
        .get(`/hotels/${hotelId}/rooms`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe(' Returning selected room of specific hotel', () => {
    it('should return selected room', async () => {
      const roomId = 4;
      const hotelId = 1;
      chai
        .request(app)
        .get(`/hotels/${hotelId}/rooms/${roomId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
    });
  });
  describe(' Delete selected room of a specified hotel', () => {
    it('should delete selected room of a specified hotel', async () => {
      const roomId = 4;
      const hotelId = 1;
      chai
        .request(app)
        .delete(`/hotels/${hotelId}/rooms/${roomId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
    });
    it('should return 404 if room of a specified hotel does not exist', async () => {
      const roomId = 6;
      const hotelId = 6;
      chai
        .request(app)
        .delete(`/hotels/${hotelId}/rooms/${roomId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
        });
    });
  });
});
