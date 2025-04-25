import pool from '../database/db';
import { Order } from '../types/order';

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT 
                       o.id AS order_id,
                       o.user_id,
                       o.status,
                       ARRAY_AGG(oi.product_id) AS productIds,
                       ARRAY_AGG(oi.quantity) AS quantities
                   FROM 
                       orders o
                   JOIN
                       order_items oi
                    ON 
                       o.id = oi.order_id
                     WHERE o.user_id = $1
                   GROUP BY 
                       o.id, o.user_id, o.status;`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(`Error fetching orders for user ${userId}:`, err);
      throw new Error(
        `Could not get orders for user with id ${userId}. Error: ${err}`
      );
    }
  }
}
