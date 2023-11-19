import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { updatePurchaseServ } from '../_server/services/purchase';
import { IPurchase } from '../_server/interfaces/purchase';

export default async function handler(req: CustomRequest<IPurchase>, res: NextApiResponse) {
  updatePurchaseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
