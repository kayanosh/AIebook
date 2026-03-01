import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { ReviewCard } from "@/components/ReviewCard";
import { FeatureItem } from "@/components/FeatureItem";
import { ArrowRight, Flame, BookOpen, Ban, Trophy, Target, TrendingUp, Users, CheckCircle2, Timer, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { SiOpenai, SiAnthropic, SiGoogle, SiGithub, SiPerplexity, SiNvidia } from "react-icons/si";

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
  const aiLogos = [
    { name: "OpenAI", Icon: SiOpenai, color: "text-emerald-600" },
    { name: "Anthropic", Icon: SiAnthropic, color: "text-orange-600" },
    { name: "Google AI", Icon: SiGoogle, color: "text-blue-600" },
    { name: "GitHub", Icon: SiGithub, color: "text-black" },
    { name: "Perplexity", Icon: SiPerplexity, color: "text-indigo-600" },
    { name: "NVIDIA", Icon: SiNvidia, color: "text-green-600" },
  ];

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
            Make <span className="text-primary">£1,000/Month</span><br/>
            With AI —<br/>
            <span className="underline decoration-8 decoration-primary underline-offset-8">Step-by-Step Beginner Blueprint</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl md:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-1"
          >
            No experience. No coding.{" "}<span className="text-black font-bold">Real systems that work.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-4 border-black font-black uppercase tracking-widest text-base md:text-lg px-10 py-5 h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              onClick={() => document.getElementById("sneak-peek")?.scrollIntoView({ behavior: "smooth" })}
            >
              Show me what&#39;s inside <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              <a href="/ebook">Already purchased? Restore access</a>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Sneak Peek — 9 Models */}
      <section id="sneak-peek" className="py-16 md:py-24 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-primary uppercase font-bold tracking-widest text-xs md:text-sm mb-3 block">Sneak Peek — What You're Getting</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase mb-4">
              9 Models. All Tested. <span className="text-primary">All Real.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Every model below has a detailed chapter: what to do on Day 1, how to price it, where to find clients, and which AI tools cut the work in half.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                n: "01",
                title: "AI Content Writing",
                revenue: "£1,000 – £5,000/mo",
                tag: "Beginner Friendly",
                desc: "Local businesses need blogs, product pages and landing copy — but hate writing. Use AI to produce a full month of content in a day. Charge per piece or on retainer.",
                tools: "ChatGPT · Claude · SurferSEO",
              },
              {
                n: "02",
                title: "Web & App Creation",
                revenue: "£2,000 – £8,000/project",
                tag: "High Ticket",
                desc: "AI coding tools now build functional, polished websites in hours. Learn to scope projects, manage handoff, and charge project rates with optional monthly maintenance retainers.",
                tools: "Cursor · v0 · Replit · Vercel",
              },
              {
                n: "03",
                title: "SEO Content Clusters",
                revenue: "£800 – £2,000/cluster",
                tag: "Scalable",
                desc: "Create 10–20 interlinked articles targeting a niche in an afternoon. Sell as a one-off SEO package to local businesses, dentists, solicitors, estate agents.",
                tools: "Claude · Perplexity · SurferSEO",
              },
              {
                n: "04",
                title: "Social Media Management",
                revenue: "£500 – £1,500/mo per client",
                tag: "Recurring Income",
                desc: "Schedule a week of posts in 90 minutes using AI. Land 3–5 retainer clients and you're at £1,000+/mo. Chapter 4 includes the exact DM script that converts cold prospects.",
                tools: "ChatGPT · Canva AI · Buffer",
              },
              {
                n: "05",
                title: "AI Email Marketing",
                revenue: "£500 – £1,500/sequence",
                tag: "High Demand",
                desc: "Every business with a list needs email sequences — welcome, nurture, sales. AI writes them in minutes. You charge hundreds. The pricing psychology chapter shows you exactly how to sell this.",
                tools: "ChatGPT · Mailchimp · Klaviyo",
              },
              {
                n: "06",
                title: "AI Automation Services",
                revenue: "£1,500 – £5,000/setup",
                tag: "Premium",
                desc: "Build no-code automations that save businesses hours every week — auto-reply systems, lead routing, invoice generation. Charge a setup fee and optional monthly support.",
                tools: "Make · Zapier · OpenAI API",
              },
              {
                n: "07",
                title: "Faceless YouTube / UGC",
                revenue: "£600 – £3,000/mo",
                tag: "Passive Potential",
                desc: "Script, voice-over and edit faceless educational videos using AI. Monetise through AdSense, affiliate links or brand deals — no camera, no face required.",
                tools: "ElevenLabs · Runway · CapCut AI",
              },
              {
                n: "08",
                title: "AI-Powered Ads & Copy",
                revenue: "£750 – £2,500/mo per client",
                tag: "High ROI for Clients",
                desc: "Write Meta and Google ad copy with AI. Run A/B splits. Clients pay monthly because results compound. Even one winning campaign justifies months of fees.",
                tools: "ChatGPT · AdCreative.ai · Meta Ads",
              },
              {
                n: "09",
                title: "Digital Products & Ebooks",
                revenue: "£500 – £5,000/mo passive",
                tag: "Sell Once, Earn Forever",
                desc: "Package knowledge (yours or researched) into guides, templates and micro-courses with AI. Deploy on Gumroad or your own site. The blueprint includes the exact funnel used to sell this product.",
                tools: "Claude · Gumroad · Canva AI",
              },
            ].map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-white/10 p-4 md:p-7 hover:bg-white/5 hover:border-primary/50 transition-all flex flex-col gap-2 md:gap-3"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-primary font-black text-3xl md:text-5xl leading-none opacity-40">{model.n}</span>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 px-1.5 py-1 text-right leading-tight">{model.tag}</span>
                </div>
                <h3 className="text-sm md:text-xl font-black uppercase mt-0.5">{model.title}</h3>
                <p className="text-primary font-bold text-xs md:text-sm">{model.revenue}</p>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed flex-1">{model.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 border-t border-white/10 pt-2 mt-1 hidden sm:block">
                  Tools: {model.tools}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16 flex flex-col items-center gap-6">
            <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">All 9 models have a full chapter — including scripts, pricing and day-one action steps</p>
            <Button
              onClick={openCheckout}
              className="btn-brutal h-auto min-h-16 text-xl md:text-2xl px-10 md:px-16 py-5 shadow-[6px_6px_0px_0px_rgba(250,204,21,0.6)] hover:shadow-[3px_3px_0px_0px_rgba(250,204,21,0.6)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              I'm ready — get the blueprint {!timerExpired && <span className="ml-2 opacity-70 line-through text-base">{originalPrice}</span>} <span className="ml-1">{currentPrice}</span> <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {!timerExpired && (
              <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest animate-pulse">
                <Timer className="w-4 h-4" /> Offer expires in {timerMins}:{timerSecs}
              </div>
            )}
            <button
              onClick={() => document.getElementById("value")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 mx-auto text-sm font-black uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mt-2"
            >
              Not yet — keep reading <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section id="value" className="py-16 md:py-24 px-4 bg-muted/30">
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
              
              <div className="flex flex-col items-center gap-2 mt-2">
                <button
                  onClick={() => document.getElementById("proof")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-black transition-colors"
                >
                  See what others achieved <ChevronDown className="w-4 h-4" />
                </button>
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

      {/* Testimonials */}
      <section id="proof" className="py-16 md:py-24 px-4 bg-primary/5">
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

      {/* AI Stack Logos */}
      <section className="py-8 md:py-10 px-4 bg-white border-y-2 border-black/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.18em] font-black text-muted-foreground mb-5">
            Tools covered inside the blueprint
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {aiLogos.map(({ name, Icon, color }) => (
              <div
                key={name}
                className="flex items-center justify-center gap-2 h-14 md:h-16 bg-muted/20 border-2 border-black/10 hover:border-black/30 transition-colors"
              >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wide">{name}</span>
              </div>
            ))}
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
            <a href="/terms" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="mailto:admin@mathrix.co.uk" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
