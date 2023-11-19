import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { IPurchaseFilter } from '../_server/interfaces/filter';
import { checkTotalPurchaseInTimeFrameServ } from '../_server/services/purchase';

export default async function handler(req: CustomRequest<any, ReqQuery<IPurchaseFilter>>, res: NextApiResponse) {
  checkTotalPurchaseInTimeFrameServ(req.query).then(resp => res.status(resp.status).json(resp.data));
}
