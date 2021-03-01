"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
* This generate a jwt token
* @param {Object} payload which includes `email`, `isVerified`, `id`
* @returns {Object} return jwt token
*/
var GenerateToken = function GenerateToken(payload) {
  var token = _jsonwebtoken["default"].sign({
    payload: payload
  }, process.env.JWTKEY);

  return token;
};

var _default = GenerateToken;
exports["default"] = _default;
//# sourceMappingURL=token.js.map