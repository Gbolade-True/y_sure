import type { NextApiResponse } from 'next';
import { CustomRequest } from '../_server/interfaces/ReqQuery';
import { deleteNylonServ } from '../_server/services/nylon';
import { ySureAPIGuard } from '../_server/auth';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  ySureAPIGuard(req, res).then(allow => {
    if (allow) {
      deleteNylonServ(req.query.id).then(resp => res.status(resp.status).json(resp.data));
    }
  });
}
