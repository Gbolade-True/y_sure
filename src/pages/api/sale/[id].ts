import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { getSaleByIdServ } from '../_server/services/sale';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  getSaleByIdServ(req.query.id).then(resp => res.status(resp.status).json(resp.data));
}
