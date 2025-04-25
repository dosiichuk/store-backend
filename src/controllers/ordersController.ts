import { Request, Response } from 'express';
import { OrderModel } from '../models/orderModel';

const orderModel = new OrderModel();

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orders = await orderModel.getOrdersByUserId(id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch orders for user ${id}` });
  }
};
