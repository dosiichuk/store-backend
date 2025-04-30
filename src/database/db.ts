import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  POSTGRES_PORT,
  POSTGRES_HOST,
  NODE_ENV,
} = process.env;

const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB_DEV,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
});

console.log(`NODE_ENV: ${NODE_ENV}`);
console.log(
  `Connecting to database: ${NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB_DEV}`
);

export default pool;
