import express from 'express';
import { OrderController } from './order.scontroller';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);

export const OrderRouter = router;
