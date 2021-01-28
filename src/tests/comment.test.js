import chai from "chai";
import http from "chai-http";
import app from "../app";
import jwt from "jsonwebtoken";
import "dotenv/config";
import model from "../database/models";
chai.use(http);
const expect = chai.expect;

describe("Comments", () => {
  const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: "1h" });
  
  

  beforeEach(async () => {
    await model.request.destroy({ where: { idUser: 1 } });
  });
  afterEach(async () => {
    await model.request.destroy({ where: { idUser: 1 } });
  });
  after(async () => {
    await model.Comment.destroy({ where: { comment: "yes yes" } });
  });
  it("should get all comments", async () => {
    const user = await model.User.create({
      firstname: "Maliza",
      lastname: "Constantine",
      telephone: "",
      email: "malizacoco4@gmail.com",
      password: "1234567$#8",
      gender: "Female",
      origin: "",
      profession: "",
      age: 23,
      identification_type: "",
      identification_number: "",
      user_image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    const request = await model.request.create({
      idUser: user.id,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    const res = await chai
      .request(app)
      .get(`/request/${request.id}/comments`)
      .set("authorization", `Bearer ${token}`);
  
    expect(res).to.have.status(200);
    after (async () => {
      await model.User.destroy({where:{id: user.id}})
    })
  });
  it("should manager get all comments", async () => {

    const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});

    const user = await model.User.create({
      firstname: "Maliza",
      lastname: "Constantine",
      telephone: "",
      email: "malizacoco4@gmail.com",
      password: "1234567$#8",
      gender: "Female",
      origin: "",
      profession: "",
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
      .get(`/comments`)
      .set("authorization", `Bearer ${tokenManager}`);
    expect(res).to.have.status(200);
    after (async () => {
      await model.User.destroy({where:{id: user.id}})
    })
  });

  it("should post comment", async () => {
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const res = await chai
      .request(app)
      .post(`/request/${request.id}/comment`)
      .set("authorization", `Bearer ${token}`)
      .send({ comment: "yes yes" });
    expect(res.status).to.equal(201);
  });
  it("should not  post comment on not found request", async () => {
    const res = await chai
      .request(app)
      .post(`/request/100000/comment`)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.equal(404);
  });

  it("should not post comment", async () => {
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const res = await chai
      .request(app)
      .post(`/request/${request.id}/comment`)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.equal(500);
  });

  it("should  manager reply comment", async () => {
    const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await model.User.create({
      firstname: "Maliza",
      lastname: "Constantine",
      telephone: "",
      email: "malizacoco4@gmail.com",
      password: "1234567$#8",
      gender: "Female",
      origin: "",
      profession: "",
      age: 23,
      roleId:role.id,
      identification_type: "",
      identification_number: "",
      user_image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    const comment = await model.Comment.create({
      userId:user.id,
      requesterName:`${user.firstname} ${user.lastname}`,
      requestId: request.id,
      comment:
        "test seeds.....",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const tokenManager = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "1h" });
    
    const res = await chai
      .request(app)
      .post(`/request/${request.id}/comment/${comment.id}/reply`)
      .set("authorization", `Bearer ${tokenManager}`)
      .send({ 
        userId:comment.userId,
        commentId:comment.id, 
        requesterName: comment.requesterName,
        replierName:`${user.firstname} ${user.lastname}`,
        replyContent: "yes yes" 
      })
       
    expect(res.status).to.equal(200);
    after (async () => {
      await model.User.destroy({where:{id: user.id}})
    })
  });
  it("should failed to reply comment ", async () => {
    const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await model.User.create({
      firstname: "Maliza",
      lastname: "Constantine",
      telephone: "",
      email: "malizacoco4@gmail.com",
      password: "1234567$#8",
      gender: "Female",
      origin: "",
      profession: "",
      age: 23,
      roleId:role.id,
      identification_type: "",
      identification_number: "",
      user_image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    const comment = await model.Comment.create({
      userId:user.id,
      requesterName:`${user.firstname} ${user.lastname}`,
      requestId: request.id,
      comment:
        "test seeds.....",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const tokenManager = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "1h" });
  
    const res = await chai
      .request(app)
      .post(`/request/${request.id}/comment/${comment.id}/reply`)
      .set("authorization", `Bearer ${tokenManager}`)
    expect(res.status).to.equal(404);
    after (async () => {
      await model.User.destroy({where:{id: user.id}})
    })
  });
  it("should failed to reply comment for invalid request ", async () => {
    const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await model.User.create({
      firstname: "Maliza",
      lastname: "Constantine",
      telephone: "",
      email: "malizacoco4@gmail.com",
      password: "1234567$#8",
      gender: "Female",
      origin: "",
      profession: "",
      age: 23,
      roleId:role.id,
      identification_type: "",
      identification_number: "",
      user_image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    const comment = await model.Comment.create({
      userId:user.id,
      requesterName:`${user.firstname} ${user.lastname}`,
      requestId: request.id,
      comment:
        "test seeds.....",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const tokenManager = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "1h" });
   
    const res = await chai
      .request(app)
      .post(`/request/100000/comment/${comment.id}/reply`)
      .set("authorization", `Bearer ${tokenManager}`)
    expect(res.status).to.equal(404);
    after (async () => {
      await model.User.destroy({where:{id: user.id}})
    })
  });
  it("should failed to reply comment  if coment  id is invalid", async () => {
    const role = await model.userRoles.findOne({where:{name: 'MANAGER',}});
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await model.User.create({
      firstname: "Maliza",
      lastname: "Constantine",
      telephone: "",
      email: "malizacoco4@gmail.com",
      password: "1234567$#8",
      gender: "Female",
      origin: "",
      profession: "",
      age: 23,
      roleId:role.id,
      identification_type: "",
      identification_number: "",
      user_image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    const comment = await model.Comment.create({
      userId:user.id,
      requesterName:`${user.firstname} ${user.lastname}`,
      requestId: request.id,
      comment:
        "test seeds.....",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const tokenManager = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, { expiresIn: "1h" });
   
    const res = await chai
      .request(app)
      .post(`/request/${request.id}/comment/6789/reply`)
      .set("authorization", `Bearer ${tokenManager}`)
    expect(res.status).to.equal(404);
    after (async () => {
      await model.User.destroy({where:{id: user.id}})
    })
  });
  it("should delete comment", async () => {
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const comment = await model.Comment.create({
      userId:1,
      fullname:'Maliza Constantine',
      requestId: 2,
      comment:
        "test seeds.....",
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const res = await chai
      .request(app)
      .delete(`/request/${request.id}/comment/${comment.id}`)
      .set("authorization", `Bearer ${token}`)
    expect(res.status).to.equal(200);
  });
  it("should  failed delete comment if comment id is invalid", async () => {
    const request = await model.request.create({
      idUser: 1,
      idRoom: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      requestStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const comment = await model.Comment.create({
      userId:1,
      fullname:'Maliza Constantine',
      requestId: 2,
      comment:
        "test seeds.....",
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const res = await chai
      .request(app)
      .delete(`/request/${request.id}/comment/7777777`)
      .set("authorization", `Bearer ${token}`)
 
    expect(res.status).to.equal(404);
  });
});
