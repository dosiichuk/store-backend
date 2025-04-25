import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import pool from '../database/db';
import { User } from '../types';
import { signToken } from '../utils/utils';

dotenv.config();

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        throw new Error(`User with id ${id} not found`);
      }
    } catch (err) {
      throw new Error(`Could not get user with id ${id}. Error: ${err}`);
    }
  }

  async create(
    firstName: string,
    lastName: string,
    passwordHash: string
  ): Promise<{ token: string }> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [firstName, lastName, passwordHash]);
      conn.release();
      const token = signToken(result.rows[0]);
      return { token };
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    try {
      const passwordHash = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
      );
      const conn = await pool.connect();
      const sql =
        'SELECT * FROM users WHERE first_name = $1 AND last_name = $2';
      const result = await conn.query(sql, [firstName, lastName]);
      if (result.rows.length) {
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(
          password,
          user.password_hash
        );
        if (isValidPassword) {
          return user;
        }
      }
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        return user;
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user. Error: ${err}`);
    }
  }
}
