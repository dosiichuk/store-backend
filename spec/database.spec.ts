import dotenv from "dotenv";
import pool from "../src/database/db";

dotenv.config();

describe("Database connection", () => {
  it("should connect to the database", async () => {
    const client = await pool.connect();
    expect(client).toBeDefined();
    client.release();
  });
});
