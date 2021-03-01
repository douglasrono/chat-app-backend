"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var comparePassword = function comparePassword(plainPwd, hashedPwd) {
  return _bcrypt["default"].compareSync(plainPwd, hashedPwd);
};

var _default = comparePassword;
exports["default"] = _default;
//# sourceMappingURL=Decryptor.js.map