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
  email: "mujohn27@gmail.com",
  userName: "John",
  id: "4"
});
var invalidToken = (0, _token["default"])({
  email: "invalid@gmail.com",
  isVerified: "false",
  id: "4"
});
describe("Messages tests", function () {
  it("user should get all messages", function (done) {
    _chai["default"].request(app).get("/api/messages").set('token', "".concat(token)).end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal("Messages was retrieved in succesfully");
      expect(res.status).to.equal(200);
      done();
    });
  });
  it("It should prompt error when token is not provided", function (done) {
    _chai["default"].request(app).get("/api/messages").set('token', '').end(function (err, res) {
      expect(res.body).to.be.an("object");
      expect(res.body.error).to.equal("Please provide token first");
      expect(res.body.status).to.equal(400);
      done();
    });
  });
});
//# sourceMappingURL=bbbmessages.js.map