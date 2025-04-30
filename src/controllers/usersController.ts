import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';

const userModel = new UserModel();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userModel.show(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch user with id ${id}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;
    if (!firstName || !lastName || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const userTokenAndId = await userModel.create(
      firstName,
      lastName,
      passwordHash
    );
    if (!userTokenAndId) {
      return res.status(400).json({ error: 'Failed to create user' });
    }
    res.status(201).json(userTokenAndId);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
