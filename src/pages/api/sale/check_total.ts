import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { ISaleFilter } from '../_server/interfaces/filter';
import { checkTotalSalesInTimeFrameServ } from '../_server/services/sale';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<any, ReqQuery<ISaleFilter>>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      checkTotalSalesInTimeFrameServ(req.query).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
