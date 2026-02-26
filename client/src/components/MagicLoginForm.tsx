import { useState } from "react";

export function MagicLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/magic-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Magic link sent! Check your email.");
      } else {
        setStatus(data.message);
      }
    } catch (err) {
      setStatus("Error sending magic link.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="border p-2 w-full"
      />
      <button type="submit" disabled={loading} className="btn-brutal w-full">
        {loading ? "Sending..." : "Send Magic Link"}
      </button>
      {status && <div className="text-sm mt-2">{status}</div>}
    </form>
  );
}
