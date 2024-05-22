import { Request, Response } from 'express';
import { productServices } from './product.services';
import productValidationSchema from './product.validation';

const addProduct = async (req: Request, res: Response) => {
  try {
    const productInfo = req.body;
    // validating product using ZOD
    const zodParsedData = productValidationSchema.parse(productInfo);

    const result = await productServices.addProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const dataSuccessfullMessage = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'Products fetched successfully!';

    const result = await productServices.getAllProductsFromDB(
      searchTerm as string,
    );
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
