import { Router } from 'express';
import { createNylon, getNylonById, getNylons, updateNylon } from '../controllers/nylon';

const router = Router();

router.get('/', getNylons);
router.get('/:id', getNylonById);
router.post('/create', createNylon);
router.put('/update', updateNylon);

export default router;