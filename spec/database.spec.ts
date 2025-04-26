import dotenv from "dotenv";
import pool from "../src/database/db";

dotenv.config();

describe("Database connection", () => {
  it("should connect to the database", async () => {
    const client = await pool.connect();
    const result = await client.query("SELECT current_database();");
    const databaseName = result.rows[0].current_database;
    console.log("Connected to database:", databaseName);
    expect(databaseName).toBe(process.env.POSTGRES_DB_TEST);
    expect(client).toBeDefined();
    client.release();
  });
});
