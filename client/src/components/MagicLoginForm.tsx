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
      const res = await fetch("/api/set-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("ebookAccess", "true");
        setStatus("Access restored. Redirecting...");
        onSuccess();
      } else {
        setStatus(data.message || "Unable to restore access.");
      }
    } catch (err) {
      setStatus("Error restoring access.");
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
        {loading ? "Restoring..." : "Restore Access"}
      </button>
      {status && <div className="text-sm mt-2">{status}</div>}
    </form>
  );
}
