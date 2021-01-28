process.env.NODE_ENV = 'test';

import model from '../database/models';
import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
const { expect } = chai;
chai.use(chaiHttp);
// create a room

describe('post/rooms', () => {
  it('it should  POST a room', async () => {

      const token = " ";

      const valid_input = {
          "email": "mukuru@gmail.com",
          "password": "mukuru@#"
      }
        chai.request(app)
        .post('/user/signin')
        .send(valid_input)
        .then(async (login_response) => {
            token = 'Bearer ' + login_response.body.token;
            const hotel = await model.hotel.findOne({
              where : {
                id: req.body.hotelId
              }
            });
            if(hotel){
              const room = await model.RoomModel.create(req.body);
              hotel.rooms.push(req.body.roomType + "," + " room id: " + room.id)
              await model.hotel.update({"rooms":hotel.rooms}, {
                where: { 
                  id:hotel.hotelId
                 }
              });
              if(room){
                chai.request(app)
                .post('/rooms')
                .set('Authorization', token)
                .send({
                  hotelId: 1,
                  description: "Room for underGround",
                  roomType: "First class",
                  roomLabel: "label 001",
                  status: "double",
                })
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                })
              }
            }

        })
  });
});

describe('post/rooms', () => {
  it('it should Not POST a room', () => {

      const token = " ";

      const valid_input = {
          "email": "furebo@gmail.com",
          "password": "furebo@#"
      }
        chai.request(app)
        .post('/user/signin')
        .send(valid_input)
        .then((login_response)=>{
            token = 'Bearer ' + login_response.body.token;
            chai.request(app)
            .post('/rooms')
            .set('Authorization', token)
            .send({
              hotelId: "1",
              description: "Room for underGround",
              roomType: "First class",
              roomLabel: "label 001",
              status: "double",
            })
            .end((err, res) => {
              expect(res.status).to.equal(500);
            })
        })
  });
});

describe("put/rooms/:idroom",()=>{
  
  it("should update an existing  room ",()=>{

     const token = " ";

      const valid_input = {
        "email": "mukuru@gmail.com",
        "password": "mukuru@#"
      }
      chai.request(app)
        .post('/user/signin')
        .send(valid_input)
        .then((login_response)=>{

          const idroom = 1;

          token = 'Bearer ' + login_response.body.token; 
          chai.request(app)
          .put(`/rooms/${idroom}`)
          .set('Authorization', token)
          .send({
            description: "Room for VIP"
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
          });
        })
      })
  }) 

  describe("put/rooms/:idroom",()=>{
  
    it("should Not update an existing  room ",()=>{
  
       const token = " ";
  
        const valid_input = {
          "email": "mukuru@gmail.com",
          "password": "mukuru@#"
        }
        chai.request(app)
          .post('/user/signin')
          .send(valid_input)
          .then((login_response)=>{
  
            const idroom = "0";
  
            token = 'Bearer ' + login_response.body.token; 
            chai.request(app)
            .put(`/rooms/${idroom}`)
            .set('Authorization', token)
            .send({
              description: "Room for VIP"
            })
            .end((err, res) => {
              expect(res.status).to.equal(500);
            });
          })
        })
    }) 

describe("Get All Rooms", () => {
     it("should return an array of the all Rooms", (done) => {
      chai
        .request(app)
        .get("/rooms")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);    
          done();
        });
    });
  });
  describe("Get All Rooms of a Particular hotel", () => {
    it("should return an array of the all Rooms of a hotel", (done) => {
      const hotelId = 6;
     chai
       .request(app)
       .get(`/rooms/hotels/${hotelId}/rooms`)
       .end((err, res) => {
         if (err) done(err);
         expect(res).to.have.status(200);    
         done();
       });
   });
 });
describe(' Returning selected room', () => {
    it('should return selected room', async() => {

      const roomId = 6
      const room =  await model.RoomModel.findOne({
        where: { id: roomId } 
      });
      if(room){
        chai
        .request(app)
        .get(`/rooms/${roomId}`)
        //.set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          //done();
        });
      }else{
        chai
        .request(app)
        .get(`/rooms/${roomId}`)
        //.set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          //done();
        });
      }

    });
  });
