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

var _Encryptor = _interopRequireDefault(require("../helpers/Encryptor"));

var _Decryptor = _interopRequireDefault(require("../helpers/Decryptor"));

var _token = _interopRequireDefault(require("../helpers/token"));

var _queries = _interopRequireDefault(require("../database/models/queries"));

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "model",
    value: function model() {
      return new _queries["default"]("users");
    }
  }, {
    key: "createUser",
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, userName, email, password, hashedPassword, user, cols, sels, row, _user, token, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, userName = _req$body.userName, email = _req$body.email, password = _req$body.password;
                hashedPassword = (0, _Encryptor["default"])(password);
                _context.next = 5;
                return this.model().select("*", "email=$1", [email]);

              case 5:
                user = _context.sent;

                if (!user[0]) {
                  _context.next = 11;
                  break;
                }

                res.writeHead(409, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  error: "User with this email already exist",
                  status: 409
                }));
                _context.next = 23;
                break;

              case 11:
                cols = "userName, email,password";
                sels = "'".concat(userName, "', '").concat(email, "', '").concat(hashedPassword, "'");
                _context.next = 15;
                return this.model().insert(cols, sels);

              case 15:
                row = _context.sent;
                _context.next = 18;
                return this.model().select("*", "email=$1", [email]);

              case 18:
                _user = _context.sent;
                token = (0, _token["default"])({
                  userName: userName,
                  email: email,
                  id: _user[0].id
                });
                data = {
                  userName: _user[0].userName,
                  email: _user[0].email,
                  token: token
                };
                res.writeHead(201, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  message: "User was created succesfully",
                  data: data
                }));

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](0);
                res.writeHead(500, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  error: _context.t0
                }));

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 25]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "userLogin",
    value: function () {
      var _userLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, user, token, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return this.model().select("*", "email=$1", [email]);

              case 4:
                user = _context2.sent;

                if (user[0]) {
                  if (!(0, _Decryptor["default"])(password, user[0].password)) {
                    res.writeHead(401, {
                      "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                      error: "Email or password does not match",
                      status: 401
                    }));
                  } else {
                    token = (0, _token["default"])({
                      userName: user[0].username,
                      email: user[0].email,
                      id: user[0].id
                    });
                    data = {
                      userName: user[0].userName,
                      email: user[0].email,
                      token: token
                    };
                    res.writeHead(200, {
                      "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                      message: "User was logged in succesfully",
                      data: data
                    }));
                  }
                } else {
                  res.writeHead(404, {
                    "Content-Type": "application/json"
                  });
                  res.end(JSON.stringify({
                    error: "User with this account does not exist",
                    status: 404
                  }));
                }

                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                res.writeHead(500, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  error: _context2.t0
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function userLogin(_x3, _x4) {
        return _userLogin.apply(this, arguments);
      }

      return userLogin;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map