import express from 'express';
import { productController } from './product.scontroller';

const router = express.Router();

router.post('/', productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProduct);
router.put('/:productId', productController.updateSingleProduct);
router.delete('/:productId', productController.deleteSingleProduct);

export const ProductRouter = router;
