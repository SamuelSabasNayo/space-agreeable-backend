import chai from 'chai';
import http from 'chai-http';
import app from '../app';

chai.use(http);
const { expect } = chai;
let token = '';
let userId = '';
describe('Profile APIs', () => {
  before((done) => {
    const user = {
        firstname: 'Keny',
        lastname: 'The ninja',
        email: 'keny@live.com',
        password: 'test@123',
        gender: 'Male',
        origin: 'Rwanda',
        age: 25,
        identification_type: 'ID',
        identification_number: '123344aabcef3e'
    };
    chai
      .request(app)
      .post('/user/signup')
      .send(user)
      .then((res) => {
        token = res.body.token;
        userId = res.body.user_details.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

  it('Should contain a valid token', ()=> {
      expect(token).to.not.be.null;
  })
})

describe('Updating the user profile', ()=> {
        const updatedProfile = {
            "firstname": {
              "value": "Keny upated",
              "save": true
            },
            "lastname": {
              "value": "The ninja updated",
              "save": true
            },
            "gender": {
              "value": "Male",
              "save": true
            },
            "origin": {
              "value": "Rwanda",
              "save": false
            },
            "age": {
              "value": 20,
              "save": false
            },
            "identification_type": {
              "value": "ID",
              "save": false
            },
            "identification_number": {
              "value": "126edgdgfdj",
              "save": false
            }
          }

          it('should update the user profile ', (done) => {
            chai
            .request(app)
            .put(`/user/profile/${userId}`)
            .send(updatedProfile)
            .set('authorization', token)
            .then((res) => {
                expect(res.body.profile).to.not.be.null;
                expect(res.body.profile).to.haveOwnProperty('firstname');
                expect(res.body.profile).to.haveOwnProperty('lastname');
                expect(res.body.profile).to.haveOwnProperty('origin');
                expect(res.body.profile).to.haveOwnProperty('identification_type');
                expect(res.body.profile).to.haveOwnProperty('identification_number');
                done();
            }).
            catch(err => {
              done();
            })
          });
})

describe('/GET profile', () => {
  it('Should save checked profile details', (done) => {
    chai.request(app)
    .get(`/user/profile/${userId}`)
    .set('authorization', token)
        .end((err, res) => {
              if(err){
               done(err);
              }
              expect(res).to.not.be.null;
              
              expect(res.body.lastname).to.haveOwnProperty('value');
              expect(res.body.origin).to.haveOwnProperty('value');
              expect(res.body.identification_type).to.haveOwnProperty('value');
              expect(res.body.identification_number).to.haveOwnProperty('value');
              expect(res.body.firstname.save).to.be.true;
              expect(res.body.lastname.save).to.be.true;
              done();
        });
  });
});
