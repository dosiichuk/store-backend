import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';

const productModel = new ProductModel();

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productModel.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await productModel.show(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch product with id ${id}` });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    productModel.create(req.body);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};
