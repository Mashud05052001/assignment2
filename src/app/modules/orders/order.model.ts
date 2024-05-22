import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'User email is required.'],
  },
  productId: {
    type: String,
    required: [true, 'Product price is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Product ID is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required.'],
  },
});

// creating schema model

export const Order = mongoose.model<TOrder>('Order', orderSchema);
