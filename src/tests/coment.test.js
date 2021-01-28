import chai from 'chai'
import http from 'chai-http';
import app from '../app';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

chai.use(http);
const expect =chai.expect;

const token = jwt.sign({id:2}, process.env.JWT_KEY, { expiresIn: '1h' });

describe("Comments", () => {
    it("should get all comments", (done) => {
     chai
       .request(app)
       .get("/2/comments")
       .set('authorization',`Bearer ${token}`)
       .end(async(req,res) => {
           try {
            await  expect(res).to.have.status(200);  
            done()
               
           } catch (error) {
            expect(res.status).to.equal(500);
            done()
           }
       });
   });


   it("should post comment", () =>{
       chai
        .request(app)
        .post("/3/comment")
        .set('authorization',`Bearer ${token}`)
        .send(
            {
            comment: "yes yes"
            }
          )
          .end((err, res) => {
            expect(res.status).to.equal(201);
          })
   })
   it("should not  post comment", () =>{
    chai
     .request(app)
     .post("/3/comment")
     .set('authorization',`Bearer ${token}`)
       .end((err, res) => {
         expect(res.status).to.equal(500);
       })
})
 });