import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { getPurchaseByIdServ } from '../_server/services/purchase';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  getPurchaseByIdServ(req.query.id).then(resp => res.status(resp.status).json(resp.data));
}
