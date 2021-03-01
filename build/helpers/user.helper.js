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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _queries = _interopRequireDefault(require("../database/models/queries"));

var UserHelper = /*#__PURE__*/function () {
  function UserHelper() {
    (0, _classCallCheck2["default"])(this, UserHelper);
  }

  (0, _createClass2["default"])(UserHelper, null, [{
    key: "model",
    value: function model() {
      return new _queries["default"]("messages");
    }
  }]);
  return UserHelper;
}();

(0, _defineProperty2["default"])(UserHelper, "insertData", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(messageDatas) {
    var senderId, receiverName, message, receiverId, cols, sels, row;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            senderId = messageDatas.senderId, receiverName = messageDatas.receiverName, message = messageDatas.message, receiverId = messageDatas.receiverId;
            cols = "senderId,receiverName,message,receiverId";
            sels = "'".concat(senderId, "', '").concat(receiverName, "', '").concat(message, "', ").concat(receiverId);
            _context.next = 5;
            return UserHelper.model().insert(cols, sels);

          case 5:
            row = _context.sent;

          case 6:
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
var _default = UserHelper;
exports["default"] = _default;
//# sourceMappingURL=user.helper.js.map