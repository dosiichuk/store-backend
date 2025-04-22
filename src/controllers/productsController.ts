import { Request, Response } from 'express';

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ message: 'Fetched all products' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};
