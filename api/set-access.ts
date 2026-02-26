import { NextApiRequest, NextApiResponse } from 'vercel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Set access for authenticated user
  const userEmail = req.cookies?.user_email;
  if (userEmail) {
    globalThis.accessStore = globalThis.accessStore || {};
    globalThis.accessStore[userEmail] = true;
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'User not authenticated.' });
}
