import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import model from '../database/models'
import jwt from "jsonwebtoken";
import "dotenv/config";




use(chaiHttp);

let tokenUser = '',
  idRequest = '';

const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: "2h" });

describe('GET /Request', () => {
  it('Should fetch all requestssss', async () => {
    const res = await request(app)
      .get('/request')
      .set('authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
  });

});


//POST REQUEST
describe('POST /Request', () => {
  it('Should create a request', async () => {
    const room = await model.RoomModel.create({
      hotelId:1,
      description:"Room for VIP",
      roomType:"first class",
      roomLabel:"label 001",
      status:"double",
      price:"200$-300$",
      roomImage:"https://www.images.com/image.png",
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const res = await request(app)
      .post('/Request')
      .set('authorization', `Bearer ${token}`)
      .send({
      
        idUser : 1,
        idRoom: 1,
        dateStart:"2021-01-08",
        dateEnd: "2021-01-19" 
      });
    expect(res).to.have.status(201);
  });
});


//DELETE REQUEST
 idRequest = 1;
describe('DELETE /Request/:idRequest', () => {
  it('Should delete a request by its ID', async () => {
    const res = await request(app)
      .delete(`/Request/${idRequest}`)
      .set('authorization', `Bearer ${token}`)
    expect(res).to.have.status(200);
  });
});

//UPDATE REQUEST
describe('UPDATE /Request/:idRequest', () => {
  it('Should update a request', async () => {
    const requestData = await model.request.create({
      idUser: 4,
      dateStart: '2020-11-30',
      dateEnd: '2021-01-10',
      idRoom:9,
      requestStatus:'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const res = await request(app)
      .put(`/Request/${requestData.id}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        dateStart : "2021-01-08",
        dateEnd : "2021-01-19" ,
        idRoom : 1,
      });
    expect(res).to.have.status(200);
  });
});