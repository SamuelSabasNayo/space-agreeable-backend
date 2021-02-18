/* eslint-disable import/no-named-as-default */
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

use(chaiHttp);

const { ADMIN_PASSWORD } = process.env;

let tokenAdmin = '',
  tokenManager = '',
  questionId;

describe('QUESTIONS Endpoints', () => {
  describe('POST /questions', () => {
    it('User should add a question', async () => {
      const res = await request(app)
        .post('/questions')
        .send({
          name: 'Paccy Neza',
          email: 'paccy@bn.com',
          subject: 'Different Statistics of Users',
          message: 'Nulla facilisi. Duis consequat, dolor ac fringilla posuere, sem purus bibendum est, sed tempor ante orci nec massa. In ac libero nec sem blandit consequat non nec ligula. Integer laoreet mattis augue sit amet lobortis. Donec odio lacus, facilisis sed mauris eget, sagittis luctus nunc. laoreet mattis augue sit amet lobortis. Donec odio lacus, facilisis sed mauris eget, sagittis luctus nunc.'
        });
      questionId = res.body.savedQuestion.id;
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Question added successfully!/i);
    });

    it('User should not add a question for empty email', async () => {
      const res = await request(app)
        .post('/questions')
        .send({
          name: 'Paccy Neza',
          email: '',
          subject: 'Different Statistics of Users',
          message: 'Nulla facilisi. Duis consequat, dolor ac fringilla posuere, sem purus bibendum est, sed tempor ante orci nec massa. In ac libero nec sem blandit consequat non nec ligula. Integer laoreet mattis augue sit amet lobortis. Donec odio lacus, facilisis sed mauris eget, sagittis luctus nunc. laoreet mattis augue sit amet lobortis. Donec odio lacus, facilisis sed mauris eget, sagittis luctus nunc.'
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Please enter all fields!/i);
    });

    it('User should not add a question for empty subject', async () => {
      const res = await request(app)
        .post('/questions')
        .send({
          name: 'Paccy Neza',
          email: 'paccy@bn.com',
          subject: '',
          message: 'Nulla facilisi. Duis consequat, dolor ac fringilla posuere, sem purus bibendum est, sed tempor ante orci nec massa. In ac libero nec sem blandit consequat non nec ligula. Integer laoreet mattis augue sit amet lobortis. Donec odio lacus, facilisis sed mauris eget, sagittis luctus nunc. laoreet mattis augue sit amet lobortis. Donec odio lacus, facilisis sed mauris eget, sagittis luctus nunc.'
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Please enter all fields!/i);
    });

    it('User should not add a question for empty message', async () => {
      const res = await request(app)
        .post('/questions')
        .send({
          name: 'Paccy Neza',
          email: 'paccy@bn.com',
          subject: 'Different Statistics of Users',
          message: ''
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Please enter all fields!/i);
    });
  });

  describe('GET /questions', () => {
    it('User should get FAQ', async () => {
      const res = await request(app)
        .get('/questions');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/All questions found successfully!/i);
    });
  });

  describe('GET/:id /questions/:id', () => {
    it('User should get FAQ', async () => {
      const res = await request(app)
        .get(`/questions/${questionId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Question found successfully!/i);
    });

    it('User should not get FAQ', async () => {
      const res = await request(app)
        .get('/questions/0');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Question Id does not exist!/i);
    });
  });

  describe('DELETE/:id /questions/:id', () => {
    before(async () => {
      const res = await request(app)
        .post('/user/signin')
        .send({
          email: 'spacenomad@gmail.com',
          password: ADMIN_PASSWORD
        });
      tokenAdmin = res.body.token;
      expect(res).to.have.status(200);
    });

    it('Super Admin should delete FAQ', async () => {
      const res = await request(app)
        .delete('/questions/1')
        .set('authorization', tokenAdmin);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Question deleted successfully!/i);
    });

    it('Super Admin should not delete FAQ', async () => {
      const res = await request(app)
        .delete('/questions/0')
        .set('authorization', tokenAdmin);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Question Id does not exist!/i);
    });

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

    it('Other user should not delete FAQ', async () => {
      const res = await request(app)
        .delete('/questions/0')
        .set('authorization', `${tokenManager}`);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.match(/Access denied!/i);
    });
  });
});
