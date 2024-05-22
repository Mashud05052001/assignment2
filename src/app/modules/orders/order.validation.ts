import { z } from 'zod';
import { Product } from '../products/product.model';

const orderValidationSchema = z.object({
  email: z
    .string({ invalid_type_error: 'Email must be in string format.' })
    .email({ message: 'Provide a valid email.' }),

  productId: z
    .string({
      invalid_type_error: 'Product ID must be provide in string format.',
    })
    .refine(
      async (productId) => {
        return await Product.isProductExist(productId);
      },
      {
        message: 'Product ID is not exist in Products Collection.',
      },
    ),

  price: z
    .number({ invalid_type_error: 'Price must be in number format.' })
    .min(0, { message: 'Price cannot be less then 0.' }),

  quantity: z
    .number({ invalid_type_error: 'Quantity must be in number format.' })
    .min(1, { message: 'Quantity cannot be less then 1.' }),
});

export default orderValidationSchema;
