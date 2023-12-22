import { NextApiRequest, NextApiResponse } from 'next';

export const ySureAPIGuard = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') as string[];
  const clientIP = req.socket.remoteAddress || '';

  if (!allowedIPs.includes(clientIP)) {
    res.status(403).json({ error: `Unauthorized Access - Denied, ${clientIP}` });
    return false;
  }

  return true;
};
