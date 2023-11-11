import { Router } from 'express';
import { getPurchases, getPurchaseById, makePurchase, updatePurchase, checkTotalPurchasesInTimeFrame } from '../controllers/purchase';

const router = Router();

router.get('/', getPurchases);
router.get('/:id', getPurchaseById);
router.post('/make', makePurchase);
router.put('/update', updatePurchase);
router.put('/get-total', checkTotalPurchasesInTimeFrame);

export default router;