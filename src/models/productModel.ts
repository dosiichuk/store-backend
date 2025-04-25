import pool from '../database/db';
import { Product } from '../types/product';

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        throw new Error(`Product with id ${id} not found`);
      }
    } catch (err) {
      throw new Error(`Could not get product with id ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products WHERE category = $1';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get products in category ${category}. Error: ${err}`
      );
    }
  }

  async topFiveProducts(): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const sql = `
        SELECT p.id, p.name, p.price, p.category, SUM(oi.quantity) AS total_quantity
        FROM products p
        JOIN order_items oi ON p.id = oi.product_id
        GROUP BY p.id
        ORDER BY total_quantity DESC
        LIMIT 5;
      `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get top five products. Error: ${err}`);
    }
  }
}
