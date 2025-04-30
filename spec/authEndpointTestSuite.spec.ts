describe('Authentication endpoints', () => {
  it('should return a token for valid credentials', async () => {
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
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
  });
});
