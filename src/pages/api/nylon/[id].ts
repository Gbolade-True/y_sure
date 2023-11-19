import type { NextApiResponse } from 'next';
import { getNylonByIdServ } from '../_server/services/nylon';
import { CustomRequest } from '../_server/interfaces/ReqQuery';

export default async function handler(req: CustomRequest<any, { id: string }>, res: NextApiResponse) {
  getNylonByIdServ(req.query.id as string).then(resp => res.status(resp.status).json(resp.data));
}
