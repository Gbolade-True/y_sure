import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { updateExpenseServ } from '../_server/services/expense';
import { IExpense } from '../_server/interfaces/expense';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<IExpense>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      updateExpenseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
