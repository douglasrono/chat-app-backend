import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.NODE_ENV==="testing"?process.env.DATABASE_URL_TEST :process.env.DATABASE_URL_DEV });

pool.on('error', (err) => {
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
        '$2b$10$d9H69WXJ90JViosDOY8bkux594B2Zu.yo/Y0rVsCcBrw3rT6DtnY6'
);
DROP TABLE IF EXISTS messages CASCADE;CREATE TABLE messages(
  userId SERIAL NOT NULL,
  message INTEGER NOT NULL,
  dateCreated VARCHAR NOT NULL
);
`);

export default createTables;