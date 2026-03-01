import { useState } from "react";
import { useContact } from "@/hooks/use-contact";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Users, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertContactRequestSchema, type InsertContactRequest } from "@shared/schema";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormDialog({ open, onOpenChange }: ContactFormDialogProps) {
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  
  const contactMutation = useContact();

  const form = useForm<InsertContactRequest>({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactRequest) => {
    contactMutation.mutate(data, {
      onSuccess: (res) => {
        setSuccess(true);
        toast({
          title: "Request Sent!",
          description: res.message,
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
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 300);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] max-w-lg sm:max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden gap-0">
        <div className="bg-primary p-4 sm:p-6 text-white text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl uppercase tracking-wide text-white font-black">
              {success ? "We Got You." : "Learn 1-on-1"}
            </DialogTitle>
            <DialogDescription className="text-white/90 font-medium text-sm sm:text-lg">
              {success 
                ? "We'll be in touch within 24 hours to set up your session." 
                : "Get personalised coaching to fast-track your AI business."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-8 bg-white">
          {success ? (
            <div className="flex flex-col items-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold uppercase">Request Received</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  A coach will reach out to <strong>{form.getValues().email}</strong> within 24 hours.
                </p>
              </div>
              
              <Button 
                className="w-full btn-brutal h-12 sm:h-14 text-base sm:text-lg gap-2"
                onClick={() => onOpenChange(false)}
              >
                <CheckCircle2 className="w-5 h-5" />
                Got It
              </Button>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-xs sm:text-sm font-bold uppercase">Your Name</Label>
                <Input
                  id="contact-name"
                  placeholder="John Smith"
                  className="h-11 sm:h-12 border-2 border-black text-base sm:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-primary font-bold">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-xs sm:text-sm font-bold uppercase">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 sm:h-12 border-2 border-black text-base sm:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-primary font-bold">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-xs sm:text-sm font-bold uppercase">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+44 7XXX XXXXXX"
                  required
                  className="h-11 sm:h-12 border-2 border-black text-base sm:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none"
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-primary font-bold">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-xs sm:text-sm font-bold uppercase">What do you want to learn? <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Textarea
                  id="contact-message"
                  placeholder="I want to build a SaaS app using AI..."
                  className="border-2 border-black text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary rounded-none min-h-[88px]"
                  {...form.register("message")}
                />
              </div>

              <div className="space-y-4 pt-2">
                <Button 
                  type="submit" 
                  className="w-full btn-brutal h-auto min-h-12 sm:min-h-14 py-3 sm:py-0 text-sm sm:text-xl whitespace-normal leading-tight"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5 mr-2" />
                      REQUEST 1-ON-1 COACHING
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 sm:h-12 border-2 border-black font-bold uppercase text-xs sm:text-sm"
                  onClick={() => onOpenChange(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  <span className="text-center">Your info is sent securely to admin@mathrix.co.uk</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
