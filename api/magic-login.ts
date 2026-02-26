import { z } from 'zod';
import * as crypto from 'crypto';

const emailSchema = z.string().email();

// In-memory store for demo (replace with DB in production)
const magicLinks: Record<string, string> = {};

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      emailSchema.parse(email);
      // Generate token
      const token = crypto.randomBytes(32).toString('hex');
      magicLinks[token] = email;
      // Send email with magic link
      const { sendMagicLink } = await import('./sendMagicLink');
      await sendMagicLink(email, token);
      res.status(200).json({ success: true, message: 'Magic link sent to email.' });
    } catch (err) {
      res.status(400).json({ success: false, message: 'Invalid email.' });
    }
  } else if (req.method === 'GET') {
    const { token } = req.query;
    if (typeof token !== 'string' || !magicLinks[token]) {
      return res.status(400).json({ success: false, message: 'Invalid or expired link.' });
    }
    // Set cookie for authenticated user
    res.setHeader('Set-Cookie', `user_email=${magicLinks[token]}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000`);
    delete magicLinks[token];
    return res.status(200).json({ success: true, message: 'Logged in.' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
