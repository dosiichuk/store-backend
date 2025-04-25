import { OrderStatus } from './orderStatus';

export type Order = {
  id: number;
  userId: number;
  status: keyof typeof OrderStatus;
  productIds: number[];
  productQuantities: number[];
};
