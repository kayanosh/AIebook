import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { ReviewCard } from "@/components/ReviewCard";
import { FeatureItem } from "@/components/FeatureItem";
import { ArrowRight, Flame, BookOpen, Ban, Trophy, Target, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [showCheckout, setShowCheckout] = useState(false);

  const openCheckout = () => setShowCheckout(true);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Checkout Dialog */}
      <CheckoutDialog open={showCheckout} onOpenChange={setShowCheckout} />

      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-xs md:text-sm font-bold tracking-widest uppercase">
        <span className="text-primary mr-2">⚠ WARNING:</span> 
        Price increases to £49.99 when the timer hits zero.
      </div>

      {/* Hero Section */}
      <header className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-4 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-black text-white px-6 py-2 mb-8 font-black uppercase tracking-widest text-sm md:text-base transform -rotate-2"
          >
            The No-BS Blueprint
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tighter mb-8"
          >
            Make <span className="text-primary">£1000/Mo</span><br/>
            Using <span className="underline decoration-8 decoration-primary underline-offset-8">AI Tools</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Not "someday". <span className="text-black font-bold">Now.</span><br/>
            I'm not here to sell fairy tales. I'm here to give you the exact playbook that's working for thousands.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
          >
            <Button 
              size="lg" 
              className="btn-brutal h-20 px-12 text-2xl w-full md:w-auto"
              onClick={openCheckout}
            >
              Get The Blueprint • £9.99
            </Button>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">
              <span className="text-primary mr-1">●</span> Instant PDF Download
            </p>
          </motion.div>
        </div>
      </header>

      {/* Social Proof Bar */}
      <section className="bg-black text-white py-12 border-y-4 border-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-primary mb-1">8</div>
              <div className="text-sm uppercase tracking-widest font-bold">Business Models</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-1">90</div>
              <div className="text-sm uppercase tracking-widest font-bold">Day Roadmap</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-1">47+</div>
              <div className="text-sm uppercase tracking-widest font-bold">Tested Methods</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-1">£9.99</div>
              <div className="text-sm uppercase tracking-widest font-bold">Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16">
            Most People <span className="bg-black text-white px-2">Fail</span> Because...
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 border-l-8 border-black shadow-lg">
              <Ban className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-2xl font-bold uppercase mb-4">Shiny Object Syndrome</h3>
              <p className="text-lg text-muted-foreground">
                You start content writing. Then social media management. Then AI art. Result: You master nothing and stay broke.
              </p>
            </div>
            
            <div className="bg-white p-8 border-l-8 border-black shadow-lg">
              <TrendingUp className="w-12 h-12 mb-6 text-primary" />
              <h3 className="text-2xl font-bold uppercase mb-4">Underpricing To Death</h3>
              <p className="text-lg text-muted-foreground">
                Charging £12/hour because you're scared to ask for money. McDonald's pays better. We fix this immediately.
              </p>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-2xl font-medium italic mb-8">
              "The gap between £0 and £1000 is massive. The gap between £1000 and £10,000? Much smaller."
            </p>
            <p className="text-lg uppercase font-bold text-muted-foreground">
              — Introduction, Page 4
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 sticky top-8">
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-8">
                What's Inside<br/>The <span className="text-primary">Box?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                This isn't theory. This is a collection of 8 battle-tested business models you can start TODAY with just a laptop and an internet connection.
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
                { title: "8 Proven AI Business Models", desc: "I tested 47 models. These are the only 8 that actually work in 2025." },
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
      <section className="py-24 px-4 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary uppercase font-bold tracking-widest text-sm mb-4 block">Sneak Peek</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase">
              The Models That Pay
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-white/20 p-8 hover:bg-white/5 transition-colors">
              <div className="text-primary font-black text-6xl mb-6 opacity-50">01</div>
              <h3 className="text-2xl font-bold uppercase mb-2">AI Content Writing</h3>
              <p className="text-gray-400 mb-4">Revenue: £1000-£5000/mo</p>
              <p className="text-sm leading-relaxed">
                Find local businesses with terrible websites. Use AI to fix them. Charge £100-£500 per page.
              </p>
            </div>
            
            <div className="border border-white/20 p-8 bg-white/10 transform md:-translate-y-4">
              <div className="text-primary font-black text-6xl mb-6 opacity-50">02</div>
              <h3 className="text-2xl font-bold uppercase mb-2">Video Script Writing</h3>
              <p className="text-gray-400 mb-4">Revenue: £1000-£4000/mo</p>
              <p className="text-sm leading-relaxed">
                Target YouTubers. Use AI to analyze viral hits. Write scripts that guarantee retention.
              </p>
            </div>

            <div className="border border-white/20 p-8 hover:bg-white/5 transition-colors">
              <div className="text-primary font-black text-6xl mb-6 opacity-50">03</div>
              <h3 className="text-2xl font-bold uppercase mb-2">SEO Clusters</h3>
              <p className="text-gray-400 mb-4">Revenue: £800-£2000/project</p>
              <p className="text-sm leading-relaxed">
                Create 15-article clusters for businesses in one afternoon. Rank them on Google.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16">
            They Did It. <span className="text-primary underline decoration-black">Why Not You?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase mb-8 leading-none">
            Stop Dreaming.<br/>Start <span className="text-primary">Doing.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium">
            You have two choices. Close this tab and go back to scrolling. Or invest £9.99—less than a pizza—and build a real income stream.
          </p>
          
          <div className="bg-black text-white p-8 mb-12 transform -rotate-1 shadow-xl">
            <div className="text-3xl font-black uppercase mb-2">The Offer</div>
            <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> The Complete 90-Day Blueprint</li>
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> 8 Battle-Tested Models</li>
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> Outreach Templates & Scripts</li>
              <li className="flex gap-2"><CheckCircle2 className="text-primary shrink-0" /> 100% Money-Back Guarantee</li>
            </ul>
            <div className="text-4xl font-black text-primary">£9.99</div>
          </div>

          <Button 
            onClick={openCheckout}
            className="btn-brutal h-24 text-2xl px-16 w-full md:w-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            I WANT THE BLUEPRINT <ArrowRight className="ml-2 w-8 h-8" />
          </Button>
          
          <p className="mt-6 text-sm text-muted-foreground font-bold uppercase">
            Instant Access • Secure Payment • Lifetime Updates
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <div className="font-black uppercase text-xl">
            £1000/Mo With AI
          </div>
          <div className="text-sm">
            © 2025 All Rights Reserved. Not affiliated with Facebook or Google.
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
