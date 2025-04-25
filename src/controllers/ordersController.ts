import { Request, Response } from 'express';
import { OrderModel } from '../models/orderModel';
import { Order } from '../types';

const orderModel = new OrderModel();

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orders: Order[] = await orderModel.getOrdersByUserId(id);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch orders for user ${id}` });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await orderModel.index();
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
