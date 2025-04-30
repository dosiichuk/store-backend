import { OrderModel } from '../src/models/orderModel';

describe('Order model', () => {
  const orderModel = new OrderModel();
  it('should return orders from the test database', async () => {
    const orders = await orderModel.index();
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBe(3);
  });

  it('should return orders for a user from the test database', async () => {
    const orders = await orderModel.getOrdersByUserId('1');
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBe(2);
  });
});
