import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-sm mx-auto">
      <Input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="h-11 sm:h-12 border-2 border-black text-base sm:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none"
      />
      <Button type="submit" disabled={loading} className="btn-brutal w-full h-11 sm:h-12 text-sm sm:text-base">
        {loading ? "Restoring..." : "Restore Access"}
      </Button>
      {status && <div className="text-xs sm:text-sm mt-2 text-center">{status}</div>}
    </form>
  );
}
