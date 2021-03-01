"use strict";

var chai = require('chai');

var chaiHttp = require('chai-http');

var app = require('../server');

chai.use(chaiHttp);
chai.should();
describe('App Tests', function () {
  it('should return the homepage', function (done) {
    chai.request(app).get('/').end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});
//# sourceMappingURL=index.js.map