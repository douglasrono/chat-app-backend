"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _token = _interopRequireDefault(require("../helpers/token"));

var _Encryptor = _interopRequireDefault(require("../helpers/Encryptor"));

var _mockData = _interopRequireDefault(require("./mock/mockData"));

var app = require("../server"); // import db from '../database/models';


var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var token = (0, _token["default"])({
  email: "shema@gmail.com",
  isVerified: "false",
  id: "4"
});
var token2 = (0, _token["default"])({
  email: "shemaeric@gmail.com",
  isVerified: "false",
  id: "4"
});
var invalidToken = (0, _token["default"])({
  email: "invalid@gmail.com",
  isVerified: "false",
  id: "4"
});
describe("Users tests", function () {
  it("it should return error if route does not exist", function (done) {
    _chai["default"].request(app).get("/").end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
  it("should create a user", function (done) {
    _chai["default"].request(app).post("/api/auth/signup").send(_mockData["default"][0]).end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal("User was created succesfully");
      expect(res.status).to.equal(201);
      done();
    });
  });
  it("should not create an existing user", function (done) {
    _chai["default"].request(app).post("/api/auth/signup").send(_mockData["default"][0]).end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.error).to.equal("User with this email already exist");
      expect(res.body.status).to.equal(409);
      done();
    });
  });
  it("should be able to login", function (done) {
    _chai["default"].request(app).post("/api/auth/login").send(_mockData["default"][1]).end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal("User was logged in succesfully");
      expect(res.status).to.equal(200);
      done();
    });
  });
  it("should not be able to login when email or password is wrong", function (done) {
    _chai["default"].request(app).post("/api/auth/login").send(_mockData["default"][2]).end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.error).to.equal("Email or password does not match");
      expect(res.body.status).to.equal(401);
      done();
    });
  });
  it("should not be able to login when email account does not exist", function (done) {
    _chai["default"].request(app).post("/api/auth/login").send(_mockData["default"][3]).end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.error).to.equal("User with this account does not exist");
      expect(res.body.status).to.equal(404);
      done();
    });
  });
});
//# sourceMappingURL=aaaausers.js.map