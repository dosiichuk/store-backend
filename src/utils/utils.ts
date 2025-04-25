import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../types/user';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const signToken = (user: User): string => {
  const token = jwt.sign(
    { firstName: user.firstName, lastName: user.lastName, id: user.id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};
