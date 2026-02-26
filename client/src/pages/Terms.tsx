import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="outline" className="mb-6">
          <a href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </a>
        </Button>

        <h1 className="text-3xl md:text-5xl font-black uppercase mb-6">Terms and Conditions</h1>
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <p>
            By purchasing or using this digital product, you agree to these Terms and Conditions.
          </p>

          <div>
            <h2 className="text-xl font-bold uppercase mb-2">1. Digital Product</h2>
            <p>
              This is a digital information product. Access is granted after successful payment.
              No physical goods are shipped.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase mb-2">2. Personal Use Only</h2>
            <p>
              Your purchase is for personal use only. You may not resell, redistribute, or share the
              product files or content without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase mb-2">3. Payments and Refunds</h2>
            <p>
              All payments are processed securely via third-party payment providers. If a refund policy
              is offered on the sales page, that policy applies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase mb-2">4. Earnings Disclaimer</h2>
            <p>
              Any income examples are illustrative and not guarantees. Your results depend on your own
              effort, skills, and market conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase mb-2">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for indirect or consequential
              damages arising from use of this product.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase mb-2">6. Contact</h2>
            <p>
              For support questions, please use the support contact method listed on the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
