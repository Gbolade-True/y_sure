import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { deleteNylonServ } from '../_server/services/nylon';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  deleteNylonServ(req.query.id).then(resp => res.status(resp.status).json(resp.data));
}
