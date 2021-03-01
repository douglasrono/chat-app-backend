"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _routes = _interopRequireDefault(require("./routes"));

var http = require('http');

var url = require('url');

module.exports = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  _routes["default"].checkRoutes(req, res);
});
//# sourceMappingURL=index.js.map