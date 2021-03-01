"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var EncryptPassword = function EncryptPassword(password) {
  var saltRounds = 10;
  return _bcrypt["default"].hashSync(password, saltRounds);
};

var _default = EncryptPassword;
exports["default"] = _default;
//# sourceMappingURL=Encryptor.js.map