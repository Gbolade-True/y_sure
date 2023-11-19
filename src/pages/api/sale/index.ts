import type { NextApiResponse } from 'next';
import { CustomRequest, ReqQuery } from '../_server/interfaces/ReqQuery';
import { ISaleFilter } from '../_server/interfaces/filter';
import { getSalesServ } from '../_server/services/sale';

export default async function handler(req: CustomRequest<any, ReqQuery<ISaleFilter>>, res: NextApiResponse) {
  getSalesServ(req.query).then(resp => res.status(resp.status).json(resp.data));
}
