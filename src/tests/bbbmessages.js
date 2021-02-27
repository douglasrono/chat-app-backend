import chai from "chai";
import chaiHttp from "chai-http";
const app = require("../server");
// import db from '../database/models';
import GenerateToken from "../helpers/token";
import EncryptPassword from "../helpers/Encryptor";
import mockData from "./mock/mockData";

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

const token = GenerateToken({
  email: "mujohn27@gmail.com",
  userName: "John",
  id: "4",
});

const invalidToken = GenerateToken({
  email: "invalid@gmail.com",
  isVerified: "false",
  id: "4",
});

describe("Messages tests", () => {

  it("user should get all messages", (done) => {
    chai
      .request(app)
      .get("/api/messages")
      .set('token', `${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Messages was retrieved in succesfully");
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("It should prompt error when token is not provided", (done) => {
    chai
      .request(app)
      .get("/api/messages")
      .set('token', '')
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.equal("Please provide token first");
        expect(res.body.status).to.equal(400);
        done();
      });
  });

});
