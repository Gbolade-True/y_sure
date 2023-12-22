import type { NextApiResponse } from 'next';
import { getExpenseByIdServ } from '../_server/services/expense';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      getExpenseByIdServ(req.query.id as string).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
