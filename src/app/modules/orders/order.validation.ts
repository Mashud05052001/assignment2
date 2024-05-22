import { z } from 'zod';
import { productServices } from '../products/product.services';
import { Product } from '../products/product.model';

// // Mock function to simulate checking the product ID in the database
// const isValidProductId = async (productId: string) => {
//   const product = await Product.exists({ _id: productId });
//   console.log(product, 'Mashudur Rahman Mahi');
//   return true;
// };

// // Custom refinement to check if the product ID exists in the collection
// const productIdExists = async (productId: string, ctx: any) => {
//   const exists = await isValidProductId(productId);
//   if (!exists) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Product ID does not exist.',
//     });
//   }
//   return exists;
// };

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
