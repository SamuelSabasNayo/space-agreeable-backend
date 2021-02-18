import chai from 'chai';
import http from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import model from '../database/models';

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
        images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
        hotelemail: 'five@yahoo.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
describe(' Delete selected hotel', () => {
  before((done) => {
    chai.request(app)
      .post('/hotels')
      .set('authorization', token)
      .send({
        hotelname: 'Serena Hotel',
        pricerange: '$80',
        location: 'Gisenyi',
        ranking: '3 star',
        parking: 'Yes',
        wifi: 'Yes',
        swimmingpool: 'no',
        breakfast: 'Yes',
        images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
        hotelemail: 'five@yahoo.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        hotelId = res.body.hotel.hotelId;
        done();
      });
  });
  it('should return 200 if hotel deleted', async () => {
    const allHotels = await model.hotel.findAll();
    const hotelToDelete = allHotels[1].dataValues.id;
    chai
      .request(app)
      .delete(`/hotels/${hotelToDelete}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });
});
