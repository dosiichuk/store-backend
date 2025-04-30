import { UserModel } from '../src/models/userModel';

describe('User model', () => {
  let userModel: UserModel;

  beforeAll(() => {
    userModel = new UserModel();
  });

  it('should return users from the test database', async () => {
    const users = await userModel.index();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(2);
  });

  it('should return a user by ID from the test database', async () => {
    const user = await userModel.show('1');
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });

  it('should create a new user in the test database', async () => {
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      passwordHash: 'password123',
    };
    const { token, id } = await userModel.create(
      newUser.firstName,
      newUser.lastName,
      newUser.passwordHash
    );
    expect(typeof token).toBe('string');
    expect(token).toBeDefined();
    const users = await userModel.index();
    expect(users.length).toBe(3);
    const resultOfDeletion = await userModel.deleteUser(id.toString());
    expect(resultOfDeletion).toBe(true);
  });
});
