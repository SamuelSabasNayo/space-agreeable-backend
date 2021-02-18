import chai from "chai";
import http from "chai-http";
import { app } from '../app';
import jwt from "jsonwebtoken";
import "dotenv/config";
import model from "../database/models";
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

chai.use(http);
const expect = chai.expect;

describe("search component", () =>{
    const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: "1h" });

    it("should search request", async() => {
        const user = await model.User.create({
            firstname: "Maliza",
            lastname: "Constantine",
            telephone: "",
            email: "malizacoco4@gmail.com",
            password: "1234567$#8",
            gender: "Female",
            age: 23,
            identification_type: "",
            identification_number: "",
            user_image: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
     
          const res = await chai
            .request(app)
            .get(`/request/search?idRoom=100&requestStatus=d`)
            .set("authorization", `Bearer ${token}`);
          expect(res).to.have.status(200);
          after (async () => {
            await model.User.destroy({where:{id: user.id}})
          })
    });
    it("should failed to search request", async() => {
        const user = await model.User.create({
            firstname: "Maliza",
            lastname: "Constantine",
            telephone: "",
            email: "malizacoco4@gmail.com",
            password: "1234567$#8",
            gender: "Female",
            age: 23,
            identification_type: "",
            identification_number: "",
            user_image: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
     
          const res = await chai
            .request(app)
            .get(`/request/search?idRoom=jjjjjj&requestStatus=d`)
            .set("authorization", `Bearer ${token}`);
          expect(res).to.have.status(400);
          after (async () => {
            await model.User.destroy({where:{id: user.id}})
          })
    });
    it("should manager search request for requester ", async() => {

        const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});
        const user = await model.User.create({
            firstname: "Maliza",
            lastname: "Constantine",
            telephone: "",
            email: "malizacoco4@gmail.com",
            password: "1234567$#8",
            gender: "Female",
            age: 23,
            roleId:role.id,
            identification_type: "",
            identification_number: "",
            user_image: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          const tokenManager = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "1h" });

          const res = await chai
            .request(app)
            .get(`/request/search/requester?idRoom=101&requestStatus=d`)
            .set("authorization", `Bearer ${tokenManager}`);
       
          expect(res).to.have.status(200);
          after (async () => {
            await model.User.destroy({where:{id: user.id}})
          })
    })
    it("should should manager  if querry which is not there search request for requester ", async() => {

        const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});
        const user = await model.User.create({
            firstname: "Maliza",
            lastname: "Constantine",
            telephone: "",
            email: "malizacoco4@gmail.com",
            password: "1234567$#8",
            gender: "Female",
            age: 23,
            roleId:role.id,
            identification_type: "",
            identification_number: "",
            user_image: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          const tokenManager = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "1h" });

          const res = await chai
            .request(app)
            .get(`/request/search/requester?idRoom=yuuuii&requestStatus=d`)
            .set("authorization", `Bearer ${tokenManager}`);
       
          expect(res).to.have.status(400);
          after (async () => {
            await model.User.destroy({where:{id: user.id}})
          })
    })
})