import { NextApiRequest, NextApiResponse } from 'vercel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for access cookie
  const accessCookie = req.cookies?.ebook_access;
  if (accessCookie === 'true') {
    return res.status(200).json({ hasAccess: true });
  }
  return res.status(200).json({ hasAccess: false });
}
