import { Router } from 'express';
import { checkTotalExpensesInTimeFrame, getExpenseById, getExpenses, registerExpense, updateExpense } from '../controllers/expense';

const router = Router();

router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.post('/register', registerExpense);
router.put('/update', updateExpense);
router.put('/get-total', checkTotalExpensesInTimeFrame);

export default router;