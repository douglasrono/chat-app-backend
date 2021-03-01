"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("./routes/index"));

var _verify = _interopRequireDefault(require("./helpers/verify.token"));

var _user = _interopRequireDefault(require("./helpers/user.helper"));

var hostname = "localhost";
var port = 8000;

var servers = _index["default"].listen(port);

var io = require("socket.io")(servers);

var users = [];
var User = {};
io.on("connection", function (socket) {
  socket.on("new-user", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
      var user, broadData;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              User[socket.id] = data.name;
              _context.next = 3;
              return _verify["default"].verifyAllTokens(data.token);

            case 3:
              user = _context.sent;
              users.push({
                socketId: socket.id,
                id: user.id,
                email: user.email,
                name: data.name
              });
              broadData = {
                name: data.name,
                email: user.email
              };
              socket.broadcast.emit("user-connected", broadData);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  socket.on("send-chat-message", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(messageData) {
      var message, user, sender, receiver, messageDatas, insert;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              message = messageData.message;
              _context2.next = 3;
              return _verify["default"].verifyAllTokens(messageData.token);

            case 3:
              user = _context2.sent;
              sender = users.filter(function (data) {
                return data.email === user.email;
              });
              receiver = users.filter(function (data) {
                return data.email !== user.email;
              });
              messageDatas = {
                receiverName: receiver[0] === undefined ? 'Anyonmous' : receiver[0].name,
                senderId: sender[0].id,
                receiverId: receiver[0] === undefined ? 0 : receiver[0].id,
                message: message
              };
              _context2.next = 9;
              return _user["default"].insertData(messageDatas);

            case 9:
              insert = _context2.sent;
              // const messages = await UserHelper.getMessages()
              socket.broadcast.emit("chat-message", {
                message: message,
                name: User[socket.id],
                receiverName: receiver[0] === undefined ? 'Anyonmous' : receiver[0].name
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  socket.on("disconnect", function () {
    socket.broadcast.emit("user-disconnected", User[socket.id]);
    delete User[socket.id];
  });
});
module.exports = servers;
//# sourceMappingURL=server.js.map