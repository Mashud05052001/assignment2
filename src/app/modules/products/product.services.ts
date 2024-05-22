import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductIntoDB = async (productInfo: TProduct) => {
  const result = await Product.create(productInfo);
  return result;
};
const getAllProductsFromDB = async (searchTerm: string) => {
  // using directly from mongoose
  // const result = await Product.find(query).select('-_id -__v');
  // using via post middleware removing the _id & __v

  let query = {};
  if (searchTerm) {
    const regex = new RegExp(searchTerm as string, 'i');
    query = {
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    };
  }

  const result = await Product.find(query);

  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateSingleProductIntoDB = async (
  productId: string,
  // TODO : failed to solved this any error remove from Lint warning
  productUpdatedData: any,
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    productUpdatedData,
    { new: true },
  );
  return result;
};

const deleteSingleProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const productServices = {
  addProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
};
