"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bodyParser = _interopRequireDefault(require("../helpers/bodyParser"));

var _userController = _interopRequireDefault(require("../controllers/user.controller.js"));

var _messages = _interopRequireDefault(require("../controllers/messages.controller"));

var http = require('http');

var url = require('url');

var server = require('./index');

var Routes = /*#__PURE__*/function () {
  function Routes() {
    (0, _classCallCheck2["default"])(this, Routes);
  }

  (0, _createClass2["default"])(Routes, null, [{
    key: "checkRoutes",
    value: function () {
      var _checkRoutes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var reqUrl;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reqUrl = url.parse(req.url, true); // GET Endpoint

                if (!(reqUrl.pathname == '/api/auth/signup' && req.method === 'POST')) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return _bodyParser["default"].bodyParser(req);

              case 4:
                _userController["default"].createUser(req, res);

                _context.next = 14;
                break;

              case 7:
                if (!(reqUrl.pathname == '/api/auth/login' && req.method === 'POST')) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return _bodyParser["default"].bodyParser(req);

              case 10:
                _userController["default"].userLogin(req, res);

                _context.next = 14;
                break;

              case 13:
                if (reqUrl.pathname == '/api/messages' && req.method === 'GET') {
                  // await BodyParser.bodyParser(req) 
                  _messages["default"].getMessages(req, res);
                } else {
                  res.writeHead(404, {
                    "Content-Type": "application/json"
                  });
                  res.end(JSON.stringify({
                    error: "The route does not exist",
                    status: 404
                  }));
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkRoutes(_x, _x2) {
        return _checkRoutes.apply(this, arguments);
      }

      return checkRoutes;
    }()
  }]);
  return Routes;
}();

var _default = Routes;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map