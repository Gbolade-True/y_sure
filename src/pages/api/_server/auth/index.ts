import { NextApiRequest, NextApiResponse } from 'next';

export const ySureAPIGuard = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const allowedIPs = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];
  const clientIP = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress) as string;

  if (!allowedIPs.includes(clientIP)) {
    res.status(401).json({ error: `Unauthorized Access - Denied, ${clientIP}` });
    return false;
  }

  return true;
};
