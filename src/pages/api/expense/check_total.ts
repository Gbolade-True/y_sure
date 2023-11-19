import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { checkTotalExpenseInTimeFrameServ } from '../_server/services/expense';
import { IExpenseFilter } from '../_server/interfaces/filter';

export default async function handler(req: CustomRequest<any, ReqQuery<IExpenseFilter>>, res: NextApiResponse) {
  checkTotalExpenseInTimeFrameServ(req.query).then(resp => res.status(resp.status).json(resp.data));
}
