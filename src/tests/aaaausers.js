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
  email: "shema@gmail.com",
  isVerified: "false",
  id: "4",
});
const token2 = GenerateToken({
  email: "shemaeric@gmail.com",
  isVerified: "false",
  id: "4",
});
const invalidToken = GenerateToken({
  email: "invalid@gmail.com",
  isVerified: "false",
  id: "4",
});

describe("Users tests", () => {
  it("it should return error if route does not exist", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("should create a user", (done) => {
    chai
      .request(app)
      .post("/api/auth/signup")
      .send(mockData[0])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("User was created succesfully");
        expect(res.status).to.equal(201);
        done();
      });
  });

  it("should not create an existing user", (done) => {
    chai
      .request(app)
      .post("/api/auth/signup")
      .send(mockData[0])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.equal("User with this email already exist");
        expect(res.body.status).to.equal(409);

        done();
      });
  });
  it("should be able to login", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send(mockData[1])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("User was logged in succesfully");
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("should not be able to login when email or password is wrong", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send(mockData[2])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.equal("Email or password does not match");
        expect(res.body.status).to.equal(401);
        done();
      });
  });

  it("should not be able to login when email account does not exist", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send(mockData[3])
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.equal(
          "User with this account does not exist"
        );
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});
