import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { updateExpenseServ } from '../_server/services/expense';
import { IExpense } from '../_server/interfaces/expense';

export default async function handler(req: CustomRequest<IExpense>, res: NextApiResponse) {
  updateExpenseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
