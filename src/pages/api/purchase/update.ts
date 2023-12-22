import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { updatePurchaseServ } from '../_server/services/purchase';
import { IPurchase } from '../_server/interfaces/purchase';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<IPurchase>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      updatePurchaseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
