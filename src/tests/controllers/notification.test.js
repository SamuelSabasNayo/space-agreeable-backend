import { use, request, expect } from 'chai';
import http from 'chai-http';
import models from '../../database/models';
import { app } from '../../app';

const { Notification } = models;

use(http);

let token;
let userId;

describe('Notifications', () => {
  before(async () => {
    await request(app)
      .post('/user/signup')
      .send({
        firstname: 'imag',
        lastname: 'coder',
        email: 'imag@gmail.com',
        password: 'thecoder@123'
      })
      .then((res) => {
        token = res.body.token;
        userId = res.body.user_details.id;
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
  it('should return 404 if no notifications found', (done) => {
    request(app)
      .get('/notifications')
      .set('authorization', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res.body).has.property('message');
        expect(res.body.message).to.match(/No notifications yet/i);
        done();
      });
  });
  it('should return all notifications', async () => {
    await Notification.create({
      eventType: 'PENDING',
      userId,
      requestId: 4,
      title: 'Created request',
      message: 'Your request was created',
      link: '/requests/1',
      status: 'unread'
    });
    request(app)
      .get('/notifications')
      .set('authorization', token)
      .end((err, res) => {
        if (err) return err;
        expect(res).have.status(200);
        expect(res.body).has.property('message');
        expect(res.body.message).to.match(/All received notifications/i);
      });
  });
});
