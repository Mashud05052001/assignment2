import { Request, Response } from 'express';
import { productServices } from './product.services';

const addProduct = async (req: Request, res: Response) => {
  try {
    const productInfo = req.body;
    const result = await productServices.addProductIntoDB(productInfo);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: productInfo,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let query: Object = {},
      dataSuccessfullMessage = 'Products fetched successfully!';
    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, 'i');
      query = {
        $or: [
          { name: { $regex: regex } },
          //   { description: { $regex: regex } },
          //   { category: { $regex: regex } },
        ],
      };
      dataSuccessfullMessage = `Products matching search term ${searchTerm} fetched successfully!`;
    }
    const result = await productServices.getAllProductsFromDB(query);
    res.status(200).json({
      success: true,
      message: dataSuccessfullMessage,
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    const data =
      result === null ? 'No data available with this product _id' : result;
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      err,
    });
  }
};
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await productServices.updateSingleProductIntoDB(
      productId,
      updateData,
    );
    const data =
      result === null ? 'No data available with this product _id' : result;
    // const data = result === null ? 'No data available with this product _id' : result;
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      err,
    });
  }
};
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      err,
    });
  }
};

export const productController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
