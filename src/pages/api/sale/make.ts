import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { makeSaleServ } from '../_server/services/sale';
import { ISale } from '../_server/interfaces/sale';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<ISale>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      makeSaleServ(req.body).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
