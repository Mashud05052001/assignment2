import { z } from 'zod';

const productVariantValidationSchema = z.object({
  type: z.string({
    required_error: 'Variant type is required.',
    invalid_type_error: 'Variant type must be in string format.',
  }),
  value: z.string({
    invalid_type_error: 'Variant value must be in string format.',
  }),
});

const productInventoryValidationSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: 'Inventory quantity must be in number format.',
    })
    .min(0, {
      message: 'Inventory quantity is required and must be a positive number.',
    }),
  inStock: z.boolean({
    invalid_type_error:
      'Inventory stock availability must be in boolean format.',
  }),
});

const productValidationSchema = z.object({
  name: z.string({ invalid_type_error: 'Name must be in string format.' }),

  description: z.string({
    invalid_type_error: 'Description must be in string format.',
  }),

  price: z
    .number({ invalid_type_error: 'Price must be in number format.' })
    .min(0, { message: 'Price cannot be less then 0.' }),

  category: z.string({
    invalid_type_error: 'Category must be in string format.',
  }),

  tags: z.array(
    z.string({ invalid_type_error: 'Tags element must be in string format.' }),
    { invalid_type_error: 'Tags must be provide in array of string format.' },
  ),

  variants: z.array(productVariantValidationSchema, {
    invalid_type_error:
      'Product variants must be provide in array of object format where each object must contain type & value.',
  }),

  inventory: productInventoryValidationSchema,
});

export default productValidationSchema;
