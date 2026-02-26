import { NextApiRequest, NextApiResponse } from 'vercel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for authenticated user
  const userEmail = req.cookies?.user_email;
  // In-memory access store for demo (replace with DB in production)
  const accessStore = globalThis.accessStore || {};
  if (userEmail && accessStore[userEmail]) {
    return res.status(200).json({ hasAccess: true });
  }
  return res.status(200).json({ hasAccess: false });
}
