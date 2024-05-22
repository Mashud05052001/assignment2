import { Request, Response } from 'express';
import { TOrder } from './order.interface';
import { OrderServices } from './order.services';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo: TOrder = req.body;

    const orderParsedData = await orderValidationSchema.parseAsync(orderInfo);
    const result = 'mahi';
    // const result = await OrderServices.createOrderIntoDB(
    //   orderParsedData as TOrder,
    // );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      err,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';
    const result = await OrderServices.getAllOrdersFromDB(email as string);

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
