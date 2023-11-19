import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { ISaleFilter } from '../_server/interfaces/filter';
import { checkTotalSalesInTimeFrameServ } from '../_server/services/sale';

export default async function handler(req: CustomRequest<any, ReqQuery<ISaleFilter>>, res: NextApiResponse) {
  checkTotalSalesInTimeFrameServ(req.query).then(resp => res.status(resp.status).json(resp.data));
}
