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

var _queries = _interopRequireDefault(require("../database/models/queries"));

var _verify = _interopRequireDefault(require("../helpers/verify.token"));

var MessageController = /*#__PURE__*/function () {
  function MessageController() {
    (0, _classCallCheck2["default"])(this, MessageController);
  }

  (0, _createClass2["default"])(MessageController, null, [{
    key: "model",
    value: function model() {
      return new _queries["default"]("messages");
    }
  }, {
    key: "getMessages",
    value: function () {
      var _getMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var token, user, id, messages, messageDatas;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                token = req.headers.token;

                if (!(token === undefined || token === null || token === "")) {
                  _context.next = 7;
                  break;
                }

                res.writeHead(400, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  error: "Please provide token first",
                  status: 400
                }));
                _context.next = 18;
                break;

              case 7:
                _context.next = 9;
                return _verify["default"].verifyAllTokens(token);

              case 9:
                user = _context.sent;
                id = user.id;
                _context.next = 13;
                return this.model().selectMessages(id);

              case 13:
                messages = _context.sent;
                messageDatas = [];
                messages.map(function (data) {
                  var receivername = data.receivername;
                  var found = messageDatas.filter(function (data) {
                    return data.filter(function (datas) {
                      return datas.receivername === receivername;
                    });
                  });

                  if (found.length === 0) {
                    var filtedMessages = messages.filter(function (data) {
                      return data.receivername === receivername;
                    });
                    messageDatas.push(filtedMessages);
                  }
                });
                res.writeHead(200, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  message: "Messages was retrieved in succesfully",
                  messageDatas: [messages]
                }));

              case 18:
                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                res.writeHead(500, {
                  "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                  error: _context.t0
                }));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 20]]);
      }));

      function getMessages(_x, _x2) {
        return _getMessages.apply(this, arguments);
      }

      return getMessages;
    }()
  }]);
  return MessageController;
}();

var _default = MessageController;
exports["default"] = _default;
//# sourceMappingURL=messages.controller.js.map