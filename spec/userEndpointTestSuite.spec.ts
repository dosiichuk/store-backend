import { UserModel } from '../src/models/userModel';

describe('User endpoints', () => {
  const userModel = new UserModel();
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

  it('should return all users from the index route', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
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

  it('should return a single user by ID from the show route', async () => {
    const response = await fetch('http://localhost:3000/api/users/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
    expect(response.headers.get('Authorization'));
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  it('should create a new user', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: 'Bob',
        lastName: 'Test',
        password: 'password123',
      }),
    });
    expect(response.status).toBe(201);
    const responseBody = await response.json();
    expect(typeof responseBody.token).toBe('string');
    expect(responseBody.token.length).toBeGreaterThan(0);
    expect('token' in responseBody).toBe(true);
    expect('id' in responseBody).toBe(true);
    const deletionResult = await userModel.deleteUser(
      responseBody.id.toString()
    );
    expect(deletionResult).toBe(true);
  });
});
