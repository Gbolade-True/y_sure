import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { makeSaleServ } from '../_server/services/sale';
import { ISale } from '../_server/interfaces/sale';

export default async function handler(req: CustomRequest<ISale>, res: NextApiResponse) {
  makeSaleServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
