import { Request, Response } from 'express';
import { signToken } from '../utils/utils';

import { UserModel } from '../models/userModel';

const userModel = new UserModel();

export const authenticateUser = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;
  if (!firstName || !lastName || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const user = await userModel.authenticate(firstName, lastName, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
};
