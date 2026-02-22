import { useState } from "react";
import { useCheckout } from "@/hooks/use-checkout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertLeadSchema, type InsertLead } from "@shared/schema";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const { toast } = useToast();
  
  const checkoutMutation = useCheckout();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: InsertLead) => {
    checkoutMutation.mutate(data, {
      onSuccess: (res) => {
        setSuccess(true);
        setDownloadUrl(res.downloadUrl);
        toast({
          title: "Access Granted",
          description: "Welcome to the 1%. Your download is ready.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setTimeout(() => {
        setSuccess(false);
        form.reset();
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
                : "Enter your email to instantly unlock the blueprint."}
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
                onClick={() => window.open(downloadUrl, '_blank')}
              >
                <Download className="w-5 h-5" />
                Download PDF Now
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                A copy has also been sent to {form.getValues().email}
              </p>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="email" className="text-lg font-bold uppercase">Email Address</Label>
                  <span className="text-xs font-bold text-primary uppercase">Secure Checkout</span>
                </div>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  className="h-12 border-2 border-black text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-primary font-bold">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-sm border border-black/10 text-sm space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>£1000/Month with AI (PDF)</span>
                    <span>£9.99</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground border-t pt-2 border-dashed border-black/20">
                    <span>Total</span>
                    <span className="text-black font-black">£9.99</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-brutal h-14 text-xl"
                  disabled={checkoutMutation.isPending}
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      GET INSTANT ACCESS
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL Secure Payment</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
