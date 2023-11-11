import { Router } from 'express';
import { checkTotalSalesInTimeFrame, getSaleById, getSales, makeSale, updateSale } from '../controllers/sale';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSaleById);
router.post('/make', makeSale);
router.put('/update', updateSale);
router.put('/get-total', checkTotalSalesInTimeFrame);

export default router;