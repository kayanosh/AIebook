import { NextApiRequest, NextApiResponse } from 'vercel';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Validate input
    const { name, email, message } = req.body;
    // Replace with actual storage/email logic
    // For demo, just return success
    res.status(200).json({ success: true, message: "Request received. We'll be in touch soon." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
