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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _queries = _interopRequireDefault(require("../database/models/queries"));

var verifyTokens = /*#__PURE__*/function () {
  function verifyTokens() {
    (0, _classCallCheck2["default"])(this, verifyTokens);
  }

  (0, _createClass2["default"])(verifyTokens, null, [{
    key: "model",
    value: function model() {
      return new _queries["default"]("users");
    }
  }]);
  return verifyTokens;
}();

(0, _defineProperty2["default"])(verifyTokens, "verifyAllTokens", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var decodedToken, email, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(token !== '')) {
              _context.next = 7;
              break;
            }

            decodedToken = _jsonwebtoken["default"].verify(token, process.env.JWTKEY);
            email = decodedToken.payload.email;
            _context.next = 5;
            return verifyTokens.model().select("*", "email=$1", [email]);

          case 5:
            user = _context.sent;
            return _context.abrupt("return", user[0]);

          case 7:
            return _context.abrupt("return", null);

          case 8:
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
var _default = verifyTokens;
exports["default"] = _default;
//# sourceMappingURL=verify.token.js.map