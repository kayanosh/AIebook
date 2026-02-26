
type AccessStore = Record<string, boolean>;
const globalWithAccessStore = globalThis as typeof globalThis & {
  accessStore?: AccessStore;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Set access for authenticated user
  const userEmail = req.cookies?.user_email;
  if (userEmail) {
    globalWithAccessStore.accessStore = globalWithAccessStore.accessStore || {};
    globalWithAccessStore.accessStore[userEmail] = true;
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'User not authenticated.' });
}
