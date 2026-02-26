import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { ReviewCard } from "@/components/ReviewCard";
import { FeatureItem } from "@/components/FeatureItem";
import { ArrowRight, Flame, BookOpen, Ban, Trophy, Target, TrendingUp, Users, CheckCircle2, Timer } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const timerExpired = timeLeft <= 0;
  const currentPrice = timerExpired ? "£49.99" : "£19.99";
  const originalPrice = "£49.99";

  const timerMins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const timerSecs = String(timeLeft % 60).padStart(2, "0");

  const openCheckout = () => setShowCheckout(true);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Checkout Dialog */}
      <CheckoutDialog
        open={showCheckout}
        onOpenChange={setShowCheckout}
        amountInPence={timerExpired ? 4999 : 1999}
        priceDisplay={currentPrice}
      />

      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-3 text-[10px] sm:text-xs md:text-sm font-bold tracking-wide md:tracking-widest uppercase leading-tight">
        <span className="text-primary mr-2">⚠ WARNING:</span>
        {timerExpired
          ? "Limited-time offer has expired. Full price is now £49.99."
          : `Flash sale ends in ${timerMins}:${timerSecs} — grab it for £19.99 before it's gone!`}
      </div>

      {/* Hero Section */}
      <header className="relative pt-14 pb-16 md:pt-32 md:pb-32 px-4 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-black text-white px-4 py-2 mb-6 md:mb-8 font-black uppercase tracking-widest text-xs md:text-base transform -rotate-2"
          >
            The No-BS Blueprint
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.95] md:leading-[0.9] tracking-tighter mb-6 md:mb-8"
          >
            Make <span className="text-primary">£1000/Mo</span><br/>
            Using <span className="underline decoration-8 decoration-primary underline-offset-8">AI Tools</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl md:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-1"
          >
            Not "someday". <span className="text-black font-bold">Now.</span><br/>
            I'm not here to sell fairy tales. I'm here to give you the exact playbook that's working for thousands.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full"
          >
            <div className="flex flex-col items-center gap-2 w-full max-w-md md:max-w-none md:w-auto">
              <Button 
                size="lg" 
                className="btn-brutal h-auto min-h-16 px-6 sm:px-10 py-4 text-base sm:text-xl md:text-2xl w-full md:w-auto whitespace-normal text-center leading-tight"
                onClick={openCheckout}
              >
                Get The Blueprint •{" "}
                {!timerExpired && (
                  <span className="line-through opacity-60 mr-1">{originalPrice}</span>
                )}
                <span>{currentPrice}</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full md:w-auto border-2 border-black font-bold uppercase tracking-wider text-xs sm:text-sm whitespace-normal h-auto py-3"
              >
                <a href="/ebook">Already Purchased? Restore Access</a>
              </Button>
              {!timerExpired && (
                <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-red-600 text-white px-4 sm:px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full justify-center">
                    <Timer className="w-6 h-6 animate-pulse shrink-0" />
                    <span className="text-3xl sm:text-4xl font-black tabular-nums tracking-tighter">{timerMins}:{timerSecs}</span>
                    <span className="uppercase font-black text-[10px] sm:text-sm tracking-widest leading-tight text-center sm:text-left">Price<br/>rises soon</span>
                  </div>
                  <Button
                    onClick={openCheckout}
                    className="bg-primary text-black font-black uppercase text-sm sm:text-base px-4 sm:px-6 py-3 h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all w-full whitespace-normal leading-tight"
                  >
                    Buy before it expires — £19.99
                  </Button>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </header>

      {/* Social Proof Bar */}
      <section className="bg-black text-white py-10 md:py-12 border-y-4 border-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary mb-1">9</div>
              <div className="text-xs md:text-sm uppercase tracking-wide md:tracking-widest font-bold">Business Models</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary mb-1">90</div>
              <div className="text-xs md:text-sm uppercase tracking-wide md:tracking-widest font-bold">Day Roadmap</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary mb-1">47+</div>
              <div className="text-xs md:text-sm uppercase tracking-wide md:tracking-widest font-bold">Tested Methods</div>
            </div>
            <div>
              <div className="flex flex-col items-center">
                {!timerExpired && (
                  <div className="text-lg font-black line-through text-gray-400">{originalPrice}</div>
                )}
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">{currentPrice}</div>
                {!timerExpired && (
                  <div className="text-xs text-primary font-bold">{timerMins}:{timerSecs} left</div>
                )}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wide md:tracking-widest font-bold">Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black uppercase text-center mb-10 md:mb-16">
            Most People <span className="bg-black text-white px-2">Fail</span> Because...
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white p-6 md:p-8 border-l-8 border-black shadow-lg">
              <Ban className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">Shiny Object Syndrome</h3>
              <p className="text-base md:text-lg text-muted-foreground">
                You start content writing. Then social media management. Then AI art. Result: You master nothing and stay broke.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 border-l-8 border-black shadow-lg">
              <TrendingUp className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">Underpricing To Death</h3>
              <p className="text-base md:text-lg text-muted-foreground">
                Charging £12/hour because you're scared to ask for money. McDonald's pays better. We fix this immediately.
              </p>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl font-medium italic mb-6 md:mb-8">
              "The gap between £0 and £1000 is massive. The gap between £1000 and £10,000? Much smaller."
            </p>
            <p className="text-lg uppercase font-bold text-muted-foreground">
              — Introduction, Page 4
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 lg:sticky lg:top-8">
              <h2 className="text-4xl md:text-7xl font-black uppercase leading-none mb-6 md:mb-8">
                What's Inside<br/>The <span className="text-primary">Box?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                This isn't theory. This is a collection of 9 battle-tested business models you can start TODAY with just a laptop and an internet connection.
              </p>
              
              <div className="space-y-4">
                <Button onClick={openCheckout} className="btn-brutal h-16 w-full text-xl">
                  Start Making Money Today <ArrowRight className="ml-2" />
                </Button>
                <p className="text-xs text-center text-muted-foreground uppercase">
                  30-Day Money Back Guarantee
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 grid gap-6">
              {[
                { title: "9 Proven AI Business Models", desc: "I tested 47 models. These are the only 9 that actually work in 2025." },
                { title: "The 30-90 Day Roadmap", desc: "A day-by-day checklist from £0 to your first £1000." },
                { title: "Pricing Psychology", desc: "How to charge £500 for a service that takes you 20 minutes." },
                { title: "Client Acquisition Scripts", desc: "Copy-paste messages to get your first paying client in 7 days." },
                { title: "The 'No-BS' Tech Stack", desc: "Stop paying for 10 tools. You only need these 3." },
                { title: "Real Case Studies", desc: "Detailed breakdowns of people who went from £0 to £1000+." },
              ].map((item, i) => (
                <div key={i} className="bg-muted/20 p-6 border-2 border-black/5 hover:border-black hover:bg-white transition-colors">
                  <FeatureItem title={item.title} description={item.desc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models Preview */}
      <section className="py-16 md:py-24 px-4 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-primary uppercase font-bold tracking-widest text-sm mb-4 block">Sneak Peek</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase">
              The Models That Pay
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="border border-white/20 p-6 md:p-8 hover:bg-white/5 transition-colors">
              <div className="text-primary font-black text-5xl md:text-6xl mb-4 md:mb-6 opacity-50">01</div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2">AI Content Writing</h3>
              <p className="text-gray-400 mb-4">Revenue: £1000-£5000/mo</p>
              <p className="text-sm leading-relaxed">
                Find local businesses with terrible websites. Use AI to fix them. Charge £100-£500 per page.
              </p>
            </div>
            
            <div className="border border-white/20 p-6 md:p-8 bg-white/10 transform md:-translate-y-4">
              <div className="text-primary font-black text-5xl md:text-6xl mb-4 md:mb-6 opacity-50">02</div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2">Web/App Creation</h3>
              <p className="text-gray-400 mb-4">Revenue: £2000-£8000/project</p>
              <p className="text-sm leading-relaxed">
                Use AI to build websites and apps for local businesses in hours. Charge project rates and keep monthly retainers.
              </p>
            </div>

            <div className="border border-white/20 p-6 md:p-8 hover:bg-white/5 transition-colors">
              <div className="text-primary font-black text-5xl md:text-6xl mb-4 md:mb-6 opacity-50">03</div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2">SEO Clusters</h3>
              <p className="text-gray-400 mb-4">Revenue: £800-£2000/project</p>
              <p className="text-sm leading-relaxed">
                Create 15-article clusters for businesses in one afternoon. Rank them on Google.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black uppercase text-center mb-10 md:mb-16">
            They Did It. <span className="text-primary underline decoration-black">Why Not You?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ReviewCard 
              name="James" 
              role="Manchester, UK" 
              result="£4,200/Month" 
              quote="I started in September. Got my first client (a local gym) in 9 days. Now I have 8 retainer clients and quit my warehouse job." 
            />
            <ReviewCard 
              name="Sarah" 
              role="Bristol, UK" 
              result="£2,000/Month" 
              quote="I manage 5 local businesses' Instagrams. It takes me about 4 hours a week using the AI workflow in Chapter 2." 
            />
            <ReviewCard 
              name="Marcus" 
              role="London, UK" 
              result="£3,200/Month" 
              quote="Most businesses know they need email marketing but can't write. I charge £500 for a sequence that takes me 4 hours." 
            />
          </div>
        </div>
      </section>

      {/* CTA / Final Section */}
      <section className="py-16 md:py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-8xl font-black uppercase mb-6 md:mb-8 leading-none">
            Stop Dreaming.<br/>Start <span className="text-primary">Doing.</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 font-medium">
            You have two choices. Close this tab and go back to scrolling. Or invest{" "}
            {timerExpired ? "£49.99" : "£19.99—less than a night out"}—and build a real income stream.
          </p>
          
          <div className="bg-black text-white p-6 md:p-8 mb-10 md:mb-12 transform -rotate-1 shadow-xl">
            <div className="text-2xl md:text-3xl font-black uppercase mb-2">The Offer</div>
            <ul className="text-left text-sm md:text-base space-y-3 mb-8 max-w-md mx-auto">
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> The Complete 90-Day Blueprint</li>
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> 9 Battle-Tested Models</li>
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> Outreach Templates & Scripts</li>
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> 100% Money-Back Guarantee</li>
            </ul>
            <div className="flex items-center gap-4 justify-center">
              {!timerExpired && (
                <div className="text-2xl font-black line-through text-gray-400">{originalPrice}</div>
              )}
              <div className="text-3xl md:text-4xl font-black text-primary">{currentPrice}</div>
            </div>
            {!timerExpired && (
              <div className="flex items-center justify-center gap-2 mt-2 text-sm font-bold text-primary uppercase">
                <Timer className="w-4 h-4 animate-pulse" />
                Offer expires in {timerMins}:{timerSecs}
              </div>
            )}
          </div>

          <Button 
            onClick={openCheckout}
            className="btn-brutal h-auto min-h-16 md:min-h-24 text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-16 py-4 md:py-0 w-full md:w-auto whitespace-normal leading-tight shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            I WANT THE BLUEPRINT — {currentPrice} <ArrowRight className="ml-2 w-5 h-5 md:w-8 md:h-8" />
          </Button>
          
          <p className="mt-6 text-sm text-muted-foreground font-bold uppercase">
            Instant Access • Secure Payment • Lifetime Updates
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 md:gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <div className="font-black uppercase text-lg md:text-xl">
            £1000/Mo With AI
          </div>
          <div className="text-xs md:text-sm">
            © 2025 All Rights Reserved. Not affiliated with Facebook or Google.
          </div>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm font-bold uppercase">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
