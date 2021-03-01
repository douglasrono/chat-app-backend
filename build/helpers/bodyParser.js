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

var BodyParser = /*#__PURE__*/function () {
  function BodyParser() {
    (0, _classCallCheck2["default"])(this, BodyParser);
  }

  (0, _createClass2["default"])(BodyParser, null, [{
    key: "bodyParser",
    value: function () {
      var _bodyParser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var totalChunked = "";
                  request.on("error", function (err) {
                    console.error(err);
                    reject();
                  }).on("data", function (chunk) {
                    totalChunked += chunk; // Data is in chunks, concatenating in totalChunked
                  }).on("end", function () {
                    request.body = JSON.parse(totalChunked); // Adding Parsed Chunked into request.body

                    resolve();
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function bodyParser(_x) {
        return _bodyParser.apply(this, arguments);
      }

      return bodyParser;
    }()
  }]);
  return BodyParser;
}();

var _default = BodyParser;
exports["default"] = _default;
//# sourceMappingURL=bodyParser.js.map