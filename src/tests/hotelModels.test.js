import chai from 'chai';

import http from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../app';

const { expect } = chai;

process.env.NODE_ENV = 'test';

let hotelId = 1;

chai.use(http);
let token = '';

describe('Testing hotel endpoints', () => {
  before(() => {
    const user = {
      email: 'leny@gmail.com',
      password: 'furebo@#'
    };
    token = `JWT ${jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_KEY, { expiresIn: '1h' })}`;
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      console.log(err, data);
    });
  });
  describe('Getting hotels', () => {
    it('should return all hotels', (done) => {
      chai
        .request(app)
        .get('/hotels')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should create hotel ', (done) => {
      chai.request(app)
        .post('/hotels')
        .set('authorization', token)
        .send({
          hotelname: 'Umubavu Hotel',
          pricerange: '$80',
          location: 'Musanze',
          ranking: '3 star',
          parking: 'Yes',
          wifi: 'Yes',
          swimmingpool: 'no',
          breakfast: 'Yes',
          rooms: ['Double rooms', 'Single rooms', 'complex rooms'],
          images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
          hotelemail: 'five@yahoo.com'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          hotelId = res.body.hotel.hotelId;
          done();
        });
    });
  });
});

describe(' Returning selected hotel', () => {
  // const id = hotelId;
  it('should return selected hotel', (done) => {
    chai
      .request(app)
      .get(`/hotels/${hotelId}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe(' Update selected hotel', () => {
  // const id = hotelId;
  it('should update a hotel', (done) => {
    chai
      .request(app)
      .patch(`/hotels/${hotelId}`)
      .set('authorization', token)
      .send({
        hotelname: 'Amahuwezi Hotel',
        pricerange: '$80',
        location: 'Musanze',
        ranking: '3 star',
        parking: 'Yes',
        wifi: 'Yes',
        swimmingpool: 'no',
        breakfast: 'depends',
        rooms: ['Double rooms', 'Single rooms', 'complex rooms'],
        images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
        hotelemail: 'five@yahoo.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

