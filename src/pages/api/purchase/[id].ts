import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { getPurchaseByIdServ } from '../_server/services/purchase';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      getPurchaseByIdServ(req.query.id).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
