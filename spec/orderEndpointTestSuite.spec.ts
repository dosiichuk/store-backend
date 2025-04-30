describe('Order endpoints', () => {
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

  it('should return orders for a user for a given user ID', async () => {
    const response = await fetch('http://localhost:3000/api/orders/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
