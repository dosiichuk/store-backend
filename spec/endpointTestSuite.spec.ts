

describe('Product endpoints', () => {
  let token: string;
  beforeAll(async () => {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Alice',
        lastName: 'Anderson',
        password: 'password123',
      }),
    });
    const data = await response.json();
    token = data.token;
  });

  it('should return a 404 status code for a non-existent endpoint', async () => {
    const response = await fetch('http://localhost:3000/nonexistent');
    expect(response.status).toBe(404);
  });

  it('should return a 200 status code and three products from the seed data for the request to fetch all products. Route: /api/products', async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(3);
  });
});