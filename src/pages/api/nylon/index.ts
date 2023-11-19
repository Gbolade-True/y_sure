import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { getNylonsServ } from '../_server/services/nylon';
import { INylonFilter } from '../_server/interfaces/filter';

export default async function handler(req: CustomRequest<any, ReqQuery<INylonFilter>>, res: NextApiResponse) {
  getNylonsServ(req.query).then(resp => {
    res.status(resp.status).json(resp.data);
  });
}
