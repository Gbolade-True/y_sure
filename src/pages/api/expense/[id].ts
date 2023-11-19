import type { NextApiResponse } from 'next';
import { getExpenseByIdServ } from '../_server/services/expense';
import { CustomRequest } from '../_server/interfaces/ReqQuery';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  getExpenseByIdServ(req.query.id as string).then(resp => res.status(resp.status).json(resp.data));
}
