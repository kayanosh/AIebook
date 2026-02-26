
import Stripe from "stripe";

type AccessStore = Record<string, boolean>;
const globalWithAccessStore = globalThis as typeof globalThis & {
  accessStore?: AccessStore;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

async function hasSuccessfulPayment(email: string): Promise<boolean> {
  // Walk through payment intents and match successful payments by email.
  // Works for this project because payment-intent stores receipt_email + metadata.email.
  let startingAfter: string | undefined = undefined;
  for (let i = 0; i < 20; i++) {
    const page = await stripe.paymentIntents.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    const match = page.data.some((pi) => {
      const receiptEmail = (pi.receipt_email || "").toLowerCase();
      const metaEmail = (pi.metadata?.email || "").toLowerCase();
      return pi.status === "succeeded" && (receiptEmail === email || metaEmail === email);
    });
    if (match) return true;
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1]?.id;
  }
  return false;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Set access for authenticated user
  const bodyEmail = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const cookieEmail = typeof req.cookies?.user_email === "string" ? req.cookies.user_email : "";
  const userEmail = bodyEmail || cookieEmail;

  if (userEmail) {
    const paid = await hasSuccessfulPayment(userEmail);
    if (!paid) {
      return res.status(403).json({
        success: false,
        message: "No successful payment found for this email.",
      });
    }
    globalWithAccessStore.accessStore = globalWithAccessStore.accessStore || {};
    globalWithAccessStore.accessStore[userEmail] = true;
    res.setHeader("Set-Cookie", [
      `user_email=${encodeURIComponent(userEmail)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000; Secure`,
      "ebook_access=true; Path=/; SameSite=Lax; Max-Age=31536000; Secure",
    ]);
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'User not authenticated.' });
}
