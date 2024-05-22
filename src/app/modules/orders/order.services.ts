import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderInfo: TOrder) => {
  const result = await Order.create(orderInfo);
  return result;
};

const getAllOrdersFromDB = async (email: string) => {
  let query = {};
  if (email) {
    query = { email };
  }
  const result = await Order.find(query);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
