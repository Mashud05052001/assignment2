import { Request, Response } from 'express';
import { TOrder } from './order.interface';
import { OrderServices } from './order.services';
import orderValidationSchema from './order.validation';
import { productServices } from '../products/product.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo: TOrder = req.body;

    // validating data using ZOD
    const orderParsedData = await orderValidationSchema.parseAsync(orderInfo);
    // checking the availability of the ordered product
    const productInfo = await productServices.getSingleProductFromDB(
      orderParsedData.productId,
    );
    if (productInfo) {
      if (productInfo.inventory.quantity < orderParsedData.quantity) {
        throw new Error('Insufficient quantity available in inventory');
      } else {
        const remainingQuantity =
          productInfo.inventory.quantity - orderParsedData.quantity;
        const isExist = remainingQuantity === 0 ? false : true;
        const updatedDoc = {
          inventory: {
            quantity: remainingQuantity,
            inStock: isExist,
          },
        };
        await productServices.updateSingleProductIntoDB(
          productInfo._id.toString(),
          updatedDoc,
        );
      }
    }

    const result = await OrderServices.createOrderIntoDB(
      orderParsedData as TOrder,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
      });
    }
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';
    const result = await OrderServices.getAllOrdersFromDB(email as string);
    if (result.length === 0) {
      throw new Error('Order not found');
    }
    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
      });
    }
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
