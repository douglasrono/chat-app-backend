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

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

_dotenv["default"].config();

var Model = /*#__PURE__*/function () {
  function Model(table) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Model);
    (0, _defineProperty2["default"])(this, "select", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(columns, clause, values) {
        var query, _yield$_this$pool$que, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (clause) {
                  query = "SELECT ".concat(columns, " FROM ").concat(_this.table, " WHERE ").concat(clause);
                } else {
                  query = "SELECT ".concat(columns, " FROM ").concat(_this.table);
                }

                _context.next = 4;
                return _this.pool.query(query, values);

              case 4:
                _yield$_this$pool$que = _context.sent;
                rows = _yield$_this$pool$que.rows;
                return _context.abrupt("return", rows);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])(this, "selectMessages", /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        var query, _yield$_this$pool$que2, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                query = "SELECT * FROM messages WHERE senderId=".concat(id, " OR receiverId=").concat(id);
                _context2.next = 4;
                return _this.pool.query(query);

              case 4:
                _yield$_this$pool$que2 = _context2.sent;
                rows = _yield$_this$pool$que2.rows;
                return _context2.abrupt("return", rows);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    }());
    this.table = table;
    this.pool = new _pg.Pool({
      connectionString: process.env.NODE_ENV === "testing" ? process.env.DATABASE_URL_TEST : process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV,
      ssl: {
        rejectUnauthorized: false
      }
    });
    this.pool.on('error', function (err, client) {
      console.log('freeMentors-db-error: ', err);
    });
  } // CRUD - READ Operation


  (0, _createClass2["default"])(Model, [{
    key: "insert",
    value: // CRUD - CREATE Operation
    function () {
      var _insert = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(columns, selector, values) {
        var query, _yield$this$pool$quer, rows;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "INSERT INTO ".concat(this.table, " (").concat(columns, ") VALUES (").concat(selector, ") returning *");
                _context3.prev = 1;
                _context3.next = 4;
                return this.pool.query(query, values);

              case 4:
                _yield$this$pool$quer = _context3.sent;
                rows = _yield$this$pool$quer.rows;
                return _context3.abrupt("return", rows);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 9]]);
      }));

      function insert(_x5, _x6, _x7) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }() // CRUD - UPDATE Operation

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(columns, clause, values) {
        var query, _yield$this$pool$quer2, rows;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "UPDATE ".concat(this.table, " SET ").concat(columns, " WHERE ").concat(clause, " returning *");
                _context4.prev = 1;
                _context4.next = 4;
                return this.pool.query(query, values);

              case 4:
                _yield$this$pool$quer2 = _context4.sent;
                rows = _yield$this$pool$quer2.rows;
                return _context4.abrupt("return", rows[0]);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                throw _context4.t0;

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9]]);
      }));

      function update(_x8, _x9, _x10) {
        return _update.apply(this, arguments);
      }

      return update;
    }() // CRUD - DELETE Operation

  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(clause, values) {
        var query, _yield$this$pool$quer3, rows;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = "DELETE FROM ".concat(this.table, " WHERE ").concat(clause, " returning *");
                _context5.prev = 1;
                _context5.next = 4;
                return this.pool.query(query, values);

              case 4:
                _yield$this$pool$quer3 = _context5.sent;
                rows = _yield$this$pool$quer3.rows;
                return _context5.abrupt("return", rows[0]);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                throw _context5.t0;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 9]]);
      }));

      function _delete(_x11, _x12) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Model;
}();

var _default = Model;
exports["default"] = _default;
//# sourceMappingURL=queries.js.map