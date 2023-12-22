import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientIP = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress) as string;
  res.status(202).json({ data: clientIP });
}
