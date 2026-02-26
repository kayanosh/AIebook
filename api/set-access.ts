import { NextApiRequest, NextApiResponse } from 'vercel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Set access cookie after successful payment
  res.setHeader('Set-Cookie', 'ebook_access=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000');
  return res.status(200).json({ success: true });
}
