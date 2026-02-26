import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Validate input
    const { amountInPence, email } = req.body;
    const allowedAmounts = [1999, 4999];
    if (!allowedAmounts.includes(amountInPence)) {
      return res.status(400).json({ message: 'Invalid amount.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: 'gbp',
      receipt_email: email,
      metadata: { email },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
