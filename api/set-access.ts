
type AccessStore = Record<string, boolean>;
const globalWithAccessStore = globalThis as typeof globalThis & {
  accessStore?: AccessStore;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Set access for authenticated user
  const bodyEmail = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const cookieEmail = typeof req.cookies?.user_email === "string" ? req.cookies.user_email : "";
  const userEmail = bodyEmail || cookieEmail;

  if (userEmail) {
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
