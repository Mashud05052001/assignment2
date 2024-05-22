import { Schema, model } from 'mongoose';
import {
  TProduct,
  TProductInventory,
  TProductVariant,
} from './product.interface';

const productVariantSchema = new Schema<TProductVariant>(
  {
    type: {
      type: String,
      required: [true, 'Variant type is required.'],
    },
    value: {
      type: String,
      required: [true, 'Variant value is required.'],
    },
  },
  { _id: false },
);

const productInventorySchema = new Schema<TProductInventory>(
  {
    quantity: {
      type: Number,
      required: [true, 'Inventory quantity is required.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Inventory inStock status is required.'],
    },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product Name is required.'],
  },
  description: {
    type: String,
    required: [true, 'Product Description is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required.'],
  },
  variants: {
    type: [productVariantSchema],
    required: [true, 'Product variants are required.'],
  },
  inventory: {
    type: productInventorySchema,
    required: [true, 'Product Inventory is required.'],
  },
});

// skip _id, __v using pre middleware
// productSchema.pre('find', function (next) {
//   this.select('-_id -__v');
//   next();
// });

// creating model for this schema
export const Product = model<TProduct>('Product', productSchema);
