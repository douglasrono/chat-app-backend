import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "testing"
      ? process.env.DATABASE_URL_TEST
      : process.env.DATABASE_URL_DEV,
});

pool.on("error", (err) => {
  console.log(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL,
    userName VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
  
);
INSERT INTO users (
     userName, email, password
    ) VALUES (
        'John',
        'mujohn25@gmail.com',
        '$2b$10$eitltxD4PIkwBos4blSNfuyowAfezyBihkZ0mi1UuOstlR5gwVVE6'
);
DROP TABLE IF EXISTS messages CASCADE;CREATE TABLE messages(
  senderId SERIAL,
  receiverName VARCHAR ,
  message VARCHAR NOT NULL
); 
INSERT INTO messages (
  senderId, receiverName, message
 ) VALUES (
     '1',
     'peter',
     'hello peter'
);
DROP TABLE IF EXISTS room CASCADE;CREATE TABLE room(
  userId SERIAL NOT NULL,
  roomName VARCHAR NOT NULL
);
`);

export default createTables;
