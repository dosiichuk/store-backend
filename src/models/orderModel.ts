import pool from '../database/db';
import { Order } from '../types/order';

export class OrderModel {
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = $1';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get orders for user with id ${userId}. Error: ${err}`
      );
    }
  }
}
