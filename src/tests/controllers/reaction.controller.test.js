import { use, expect, request } from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../database/models';

const { Facility, Reaction } = models;

use(http);
const { ADMIN_PASSWORD } = process.env;
let token = '';
let facilityId = '';
describe('Reactions', () => {
  before((done) => {
    const admin = {
      email: 'spacenomad@gmail.com',
      password: ADMIN_PASSWORD
    };
    request(app)
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
  describe('POST /facility/like', () => {
    before(async () => {
      const res = await Facility.create({
        location: 'Lagos',
        address: 'Wisky ave 216\'st ',
        images: 'location.jpg',
        roomNumber: 1,
        roomDetails: '{anasa:sdsds, sdsds:sdsdsds}',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      facilityId = res.dataValues.id;
    });
    it('should like facility', (done) => {
      request(app)
        .post('/facility/like')
        .set('authorization', token)
        .send({
          facilityId
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(201);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should undo reaction ', (done) => {
      request(app)
        .post('/facility/like')
        .set('authorization', token)
        .send({
          facilityId,
          unliked: true
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(200);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/Reaction undone/i);
          done();
        });
    });
    it('should re-like facility', (done) => {
      request(app)
        .post('/facility/like')
        .set('authorization', token)
        .send({
          facilityId,
          liked: true
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(200);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/Facility re-liked/i);
          done();
        });
    });
    it('should return 404 if facility does not exist', (done) => {
      request(app)
        .post('/facility/like')
        .set('authorization', token)
        .send({
          facilityId: 10
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(404);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/No facility found/i);
          done();
        });
    });
    describe('like unliked facility', () => {
      let unlikedFacility = '';
      before(async () => {
        const res = await Facility.create({
          location: 'Kigali',
          address: 'Wisky ave 216\'st ',
          images: 'location.jpg',
          roomNumber: 113,
          roomDetails: '{anasa:sdsds, sdsds:sdsdsds}',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        unlikedFacility = res.dataValues.id;
        await Reaction.create({
          facilityId: unlikedFacility,
          liked: false,
          userId: 1,
          unliked: true
        });
      });
      it('should like facility that was unliked before', (done) => {
        request(app)
          .post('/facility/like')
          .set('authorization', token)
          .send({
            facilityId: unlikedFacility,
            unliked: false,
            liked: true
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(200);
            expect(res.body).to.haveOwnProperty('message');
            expect(res.body.message).to.match(/Facility liked/i);
            done();
          });
      });
    });
  });
  describe('POST /facility/unlike', () => {
    before(async () => {
      const res = await Facility.create({
        location: 'Lagos',
        address: 'Wisky ave 216\'st ',
        images: 'location.jpg',
        roomNumber: 12,
        roomDetails: '{anasa:sdsds, sdsds:sdsdsds}',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      facilityId = res.dataValues.id;
    });
    it('should undo reaction if facility unliked before ', (done) => {
      request(app)
        .post('/facility/unlike')
        .set('authorization', token)
        .send({
          facilityId
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(201);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/Facility unliked/i);
          done();
        });
    });
    it('should like facility if unliked before', (done) => {
      request(app)
        .post('/facility/unlike')
        .set('authorization', token)
        .send({
          facilityId,
          liked: true
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(200);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/Reaction undone/i);
          done();
        });
    });
    it('should undo reaction facility', (done) => {
      request(app)
        .post('/facility/unlike')
        .set('authorization', token)
        .send({
          facilityId,
          unliked: false,
          liked: false
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(200);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/Facility re-unliked/i);
          done();
        });
    });
    it('should return 404 if facility does not exist', (done) => {
      request(app)
        .post('/facility/unlike')
        .set('authorization', token)
        .send({
          facilityId: 10
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).have.status(404);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.match(/No facility found/i);
          done();
        });
    });
    describe('unlike liked facility', () => {
      let likedFacility = '';
      before(async () => {
        const res = await Facility.create({
          location: 'Gisenyi',
          address: 'Wisky ave 216\'st ',
          images: 'location.jpg',
          roomNumber: 114,
          roomDetails: '{anasa:sdsds, sdsds:sdsdsds}',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        likedFacility = res.dataValues.id;
        await Reaction.create({
          facilityId: likedFacility,
          liked: true,
          userId: 1,
          unliked: false
        });
      });
      it('should unlike facility that was liked before', (done) => {
        request(app)
          .post('/facility/unlike')
          .set('authorization', token)
          .send({
            facilityId: likedFacility,
            unliked: true,
            liked: false
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res).have.status(200);
            expect(res.body).to.haveOwnProperty('message');
            expect(res.body.message).to.match(/Facility unliked/i);
            done();
          });
      });
    });
  });
});
