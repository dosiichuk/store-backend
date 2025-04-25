import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import pool from '../database/db';

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

async function seed() {
    try {
      console.log('Seeding database...');
  
      const password1 = await bcrypt.hash('password123', SALT_ROUNDS);
      const password2 = await bcrypt.hash('securepass', SALT_ROUNDS);
  

      const userRes = await pool.query(`
        INSERT INTO users (first_name, last_name, password_hash)
        VALUES 
          ('Alice', 'Anderson', $1),
          ('Bob', 'Brown', $2)
        RETURNING id;
      `, [password1, password2]);
  
      const userIds = userRes.rows.map((u: any) => u.id);
  
      const productRes = await pool.query(`
        INSERT INTO products (name, price, category)
        VALUES 
          ('Laptop', 999.99, 'Electronics'),
          ('Desk Chair', 149.99, 'Furniture'),
          ('Wireless Mouse', 29.99, 'Electronics')
        RETURNING id;
      `);
  
      const productIds = productRes.rows.map((p: any) => p.id);
  
      const orderRes = await pool.query(`
        INSERT INTO orders (user_id, status)
        VALUES 
          ($1, 'active'),
          ($2, 'complete'),
          ($1, 'active')
        RETURNING id;
      `, [userIds[0], userIds[1]]);
  
      const orderIds = orderRes.rows.map((o: any) => o.id);
  

      await pool.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES 
          ($1, $2, 2),
          ($1, $3, 1),
          ($2, $2, 1),
          ($3, $1, 1),
          ($3, $3, 3);
      `,
        [
          orderIds[0],
          productIds[1],
          orderIds[2]
        ]
      );
  
      console.log('Database seeded successfully.');
    } catch (err) {
      console.error('Seeding failed:', err);
    } finally {
      await pool.end();
    }
  }
  
  seed();