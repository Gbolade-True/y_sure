import type { NextApiResponse } from 'next';
import { INylon } from '../_server/interfaces/nylon';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { updateNylonServ } from '../_server/services/nylon';

export default async function handler(req: CustomRequest<INylon>, res: NextApiResponse) {
  updateNylonServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
