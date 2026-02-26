import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { api } from "@shared/routes";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK as string);

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amountInPence: number;
  priceDisplay: string;
}

export function CheckoutDialog({ open, onOpenChange, amountInPence, priceDisplay }: CheckoutDialogProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutDialogInner
        open={open}
        onOpenChange={onOpenChange}
        amountInPence={amountInPence}
        priceDisplay={priceDisplay}
      />
    </Elements>
  );
}

function CheckoutDialogInner({ open, onOpenChange, amountInPence, priceDisplay }: CheckoutDialogProps) {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Validate email
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setLoading(true);

    try {
      // 1. Create PaymentIntent on server
      const piRes = await fetch(api.paymentIntent.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amountInPence }),
      });
      const piData = await piRes.json();
      if (!piRes.ok) throw new Error(piData.message || "Payment setup failed");

      // 2. Confirm card payment
      const card = elements.getElement(CardElement);
      if (!card) throw new Error("Card element not found");

      const { error, paymentIntent } = await stripe.confirmCardPayment(piData.clientSecret, {
        payment_method: { card, billing_details: { email } },
      });

      if (error) throw new Error(error.message);
      if (paymentIntent?.status === "succeeded") {
        localStorage.setItem("ebookAccess", "true");
        setSuccess(true);
        toast({ title: "Payment successful!", description: "Welcome — your blueprint is ready." });
      }
    } catch (err: any) {
      toast({ title: "Payment failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => {
        setSuccess(false);
        setEmail("");
        setEmailError("");
      }, 300);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden gap-0">
        <div className="bg-primary p-6 text-white text-center">
          <DialogHeader>
            <DialogTitle className="text-3xl uppercase tracking-wide text-white font-black">
              {success ? "You're In." : "Almost There"}
            </DialogTitle>
            <DialogDescription className="text-white/90 font-medium text-lg">
              {success
                ? "The gap between £0 and £1000 starts closing now."
                : "Enter your details to unlock the blueprint."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 bg-white">
          {success ? (
            <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold uppercase">Payment Verified</h3>
                <p className="text-muted-foreground">
                  Your copy of "£1000/Month with AI" is ready.
                </p>
              </div>

              <Button
                className="w-full btn-brutal h-14 text-lg gap-2"
                onClick={() => {
                  onOpenChange(false);
                  navigate("/ebook");
                }}
              >
                <Download className="w-5 h-5" />
                Read The Blueprint Now
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Access granted for {email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="email" className="text-lg font-bold uppercase">Email Address</Label>
                  <span className="text-xs font-bold text-primary uppercase">Secure Checkout</span>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 border-black text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none"
                />
                {emailError && (
                  <p className="text-sm text-primary font-bold">{emailError}</p>
                )}
              </div>

              {/* Card details */}
              <div className="space-y-2">
                <Label className="text-lg font-bold uppercase">Card Details</Label>
                <div className="border-2 border-black px-4 py-3 focus-within:border-primary transition-colors">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#000",
                          fontFamily: "inherit",
                          "::placeholder": { color: "#9ca3af" },
                        },
                        invalid: { color: "#ef4444" },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Order summary */}
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-sm border border-black/10 text-sm space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>£1000/Month with AI (PDF)</span>
                    <span>{priceDisplay}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground border-t pt-2 border-dashed border-black/20">
                    <span>Total</span>
                    <span className="text-black font-black">{priceDisplay}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-brutal h-14 text-xl"
                  disabled={loading || !stripe}
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Processing...</>
                  ) : (
                    <>PAY {priceDisplay} — GET ACCESS</>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL Secure Payment via Stripe</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
