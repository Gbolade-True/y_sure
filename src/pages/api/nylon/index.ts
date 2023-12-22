import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { getNylonsServ } from '../_server/services/nylon';
import { INylonFilter } from '../_server/interfaces/filter';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<any, ReqQuery<INylonFilter>>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      getNylonsServ(req.query).then(resp => {
        res.status(resp.status).json(resp.data);
      });
    }
  });
}
