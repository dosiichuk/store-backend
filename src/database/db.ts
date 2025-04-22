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
  ENV,
} = process.env;

const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB_DEV,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
});

export default pool;
