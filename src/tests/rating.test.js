import chai from 'chai';
import app from '../app';
import model from '../database/models';

process.env.NODE_ENV = 'test';

const { expect } = chai;
const travelAdminPwd = process.env.ADMIN_PASSWORD;
let token;
let facId = '';

describe('Rating', () => {
  before((done) => {
    const admin = {
      email: 'spacenomad@gmail.com',
      password: travelAdminPwd
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
  describe('Get ratings for facility', () => {
    before(async () => {
      const res = await model.Facility.create({
        location: 'Kigali',
        address: 'Wisky ave 216\'st ',
        images: 'location.jpg',
        roomNumber: 14,
        roomDetails: '{anasa:sdsds, sdsds:sdsdsds}',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      facId = res.dataValues.id;
    });
    it(`should get ratings for facility ${facId}`, (done) => {
      chai
        .request(app)
        .get(`/facility/${facId}/ratings`)
        .set('authorization', token)
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should not not get rating for facility 1892', (done) => {
      chai
        .request(app)
        .get('/facility/1892/ratings')
        .set('authorization', token)
        .end((err, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should not not get rating for facility 18jk', (done) => {
      chai
        .request(app)
        .get('/facility/18jk/ratings')
        .set('authorization', token)
        .end((err, response) => {
          expect(response).to.have.status(500);
          done();
        });
    });
  });
  describe('Test add ratings', () => {
    before(async () => {
      const res = await model.Facility.create({
        location: 'Kigali',
        address: 'Wisky ave 216\'st ',
        images: 'location.jpg',
        roomNumber: 14,
        roomDetails: '{anasa:sdsds, sdsds:sdsdsds}',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      facId = res.dataValues.id;
    });
    it('should not rate facility with id 1891', (done) => {
      const data = {
        rating: '4.7'
      };
      chai
        .request(app)
        .post('/facility/1891/rate')
        .set('authorization', token)
        .send(data)
        .end((err, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should not rate facility with id 1891', (done) => {
      const data = {
        rate: '4.7'
      };
      chai
        .request(app)
        .post('/facility/1891/rate')
        .set('authorization', token)
        .send(data)
        .end((err, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should not rate facility with id 1891', (done) => {
      const data = {
        rating: '4.7'
      };

      chai
        .request(app)
        .post('/facility/1/rate')
        .send(data)
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it(`should rate facility with id ${facId}`, (done) => {
      const data = {
        rating: '4.7'
      };
      chai
        .request(app)
        .post(`/facility/${facId}/rate`)
        .set('authorization', token)
        .send(data)
        .end((err, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should not rate facility with id 18kj', (done) => {
      const data = {
        rating: '4.7'
      };
      chai
        .request(app)
        .post('/facility/18kj/rate')
        .set('authorization', token)
        .send(data)
        .end((err, response) => {
          expect(response).to.have.status(500);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
});
