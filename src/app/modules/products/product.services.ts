import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductIntoDB = async (productInfo: TProduct) => {
  const result = await Product.create(productInfo);
  return result;
};
const getAllProductsFromDB = async (query: any) => {
  // using directly from mongoose
  //   const result = await Product.find().select('-_id -__v');

  // using via post middleware removing the _id & __v
  const result = await Product.find(query);
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId).select('-_id -__v');
  return result;
};

const updateSingleProductIntoDB = async (
  productId: string,
  productUpdatedData: any,
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    productUpdatedData,
    { new: true },
  ).select('-_id -__v');
  return result;
};

const deleteSingleProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const searchProductsFromDBbyKeyword = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
    ],
  });
  return result;
};

export const productServices = {
  addProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
  searchProductsFromDBbyKeyword,
};
