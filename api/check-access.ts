type AccessStore = Record<string, boolean>;
const globalWithAccessStore = globalThis as typeof globalThis & {
  accessStore?: AccessStore;
};

export default async function handler(req: any, res: any) {
  // Check for authenticated user
  const userEmail = typeof req.cookies?.user_email === "string"
    ? decodeURIComponent(req.cookies.user_email)
    : "";
  const hasCookieAccess = req.cookies?.ebook_access === "true";
  // In-memory access store for demo (replace with DB in production)
  const accessStore = globalWithAccessStore.accessStore || {};
  if (userEmail && (hasCookieAccess || accessStore[userEmail])) {
    return res.status(200).json({ hasAccess: true });
  }
  return res.status(200).json({ hasAccess: false });
}
