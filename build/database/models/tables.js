"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.NODE_ENV === "testing" ? process.env.DATABASE_URL_TEST : process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.on("error", function (err) {
  console.log(err);
});
var createTables = pool.query("DROP TABLE IF EXISTS users CASCADE;\nCREATE TABLE users(\n    id SERIAL NOT NULL,\n    userName VARCHAR NOT NULL,\n    email VARCHAR NOT NULL,\n    password VARCHAR NOT NULL\n  \n);\nINSERT INTO users (\n     userName, email, password\n    ) VALUES (\n        'John',\n        'mujohn25@gmail.com',\n        '$2b$10$eitltxD4PIkwBos4blSNfuyowAfezyBihkZ0mi1UuOstlR5gwVVE6'\n);\nDROP TABLE IF EXISTS messages CASCADE;CREATE TABLE messages(\n  id SERIAL NOT NULL,\n  senderId SERIAL,\n  receiverId SERIAL,\n  receiverName VARCHAR ,\n  message VARCHAR NOT NULL\n); \nINSERT INTO messages (\n  senderId, receiverName, message\n ) VALUES (\n     '1',\n     'peter',\n     'hello peter'\n);\nDROP TABLE IF EXISTS room CASCADE;CREATE TABLE room(\n  userId SERIAL NOT NULL,\n  roomName VARCHAR NOT NULL\n);\n");
var _default = createTables;
exports["default"] = _default;
//# sourceMappingURL=tables.js.map