import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { MagicLoginForm } from "@/components/MagicLoginForm";
import { ArrowLeft, Lock, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, Terminal, Users } from "lucide-react";

// Payment gate check
function hasEbookAccess(): boolean {
  return localStorage.getItem("ebookAccess") === "true";
}

// ---- Sub-components ----

function ChapterNav({ onNav }: { onNav: (id: string) => void }) {
  const chapters = [
    { id: "intro", label: "Intro" },
    { id: "ch1", label: "Ch 1" },
    { id: "ch2", label: "Ch 2: Models" },
    { id: "ch3", label: "Ch 3: First 7 Days" },
    { id: "ch4", label: "Ch 4: First Client" },
    { id: "ch5", label: "Ch 5: Quality" },
    { id: "ch6", label: "Ch 6: Scaling" },
    { id: "ch7", label: "Ch 7: Traps" },
    { id: "ch8", label: "Ch 8: Roadmap" },
    { id: "bonus", label: "Bonus" },
  ];
  return (
    <div className="flex gap-2 flex-wrap mb-10 p-5 bg-muted/30 border-2 border-black/10">
      {chapters.map((ch) => (
        <button
          key={ch.id}
          onClick={() => onNav(ch.id)}
          className="bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 border-2 border-black hover:bg-primary hover:border-primary transition-all"
        >
          {ch.label}
        </button>
      ))}
    </div>
  );
}

function Step({ num, title, desc, variant }: { num: string; title: string; desc: string; variant?: "good" | "bad" }) {
  const bg = variant === "bad" ? "border-l-4 border-l-red-500" : variant === "good" ? "border-l-4 border-l-green-500" : "border-l-4 border-l-primary";
  return (
    <div className={`bg-muted/20 border-2 border-black/5 p-5 flex gap-4 items-start ${bg}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black ${
        variant === "bad" ? "bg-red-500 text-white" : variant === "good" ? "bg-green-500 text-white" : "bg-primary text-white"
      }`}>
        {num}
      </div>
      <div className="flex-1">
        <p className="font-bold uppercase text-base mb-1">{title}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ToolGuide({ icon, name, subtitle, children }: { icon: string; name: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-black/10 my-4">
      <div className="flex items-center gap-3 p-4 border-b-2 border-black/10 bg-muted/20">
        <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center text-xs font-black flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="font-bold uppercase text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="p-4 space-y-3 text-sm">{children}</div>
    </div>
  );
}

function ToolStep({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start py-2 border-b border-black/5 last:border-0">
      <span className="text-xs font-black bg-primary/10 text-primary px-2 py-0.5 rounded flex-shrink-0">{num}</span>
      <span className="text-muted-foreground leading-relaxed">{children}</span>
    </div>
  );
}

function PromptBox({ label, children }: { label: string; children: string }) {
  return (
    <div className="border-2 border-black/10 my-4 overflow-hidden">
      <div className="bg-black text-primary px-4 py-2 text-xs font-black uppercase tracking-widest flex items-center gap-2">
        <Terminal className="w-3 h-3" /> {label}
      </div>
      <pre className="bg-muted/30 p-4 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}

function CaseStudy({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-l-primary bg-primary/5 p-5 my-6">
      <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Case Study</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-l-blue-500 bg-blue-50 p-4 my-4 text-sm flex gap-3">
      <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-l-red-500 bg-red-50 p-4 my-4 text-sm flex gap-3">
      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

function PricingTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-2 border-black/10 text-sm">
        <thead>
          <tr className="bg-black text-white">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-bold uppercase tracking-wider text-xs">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-muted/20" : "bg-white"}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 border-t border-black/5" dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModelCard({ num, title, revenue, time, difficulty, children }: {
  num: number; title: string; revenue: string; time: string; difficulty: string; children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-black/10 my-6">
      <div className="bg-muted/20 p-5 border-b-2 border-black/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h4 className="font-bold uppercase text-lg">Model {num}: {title}</h4>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full">{revenue}</span>
          <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded-full">{time}</span>
          <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">{difficulty}</span>
        </div>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function ChapterCard({ id, icon, label, title, children }: {
  id: string; icon: string; label: string; title: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="card-brutal mb-8 overflow-hidden">
      <div className="bg-black text-white p-6 flex items-start gap-5">
        <div className="w-14 h-14 border-2 border-white/20 flex items-center justify-center flex-shrink-0 text-xl font-black">
          {icon}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-primary mb-1">{label}</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight">{title}</h2>
        </div>
      </div>
      <div className="p-6 md:p-8 bg-white text-foreground space-y-4 text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full bg-muted/50 rounded-sm h-2 my-2 border border-black/5">
      <div className="h-full bg-primary rounded-sm transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ---- Paywall ----

function Paywall() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="w-24 h-24 bg-black text-white mx-auto flex items-center justify-center">
          <Lock className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase">Content Locked</h1>
        <p className="text-lg text-muted-foreground">
          You need to purchase the blueprint to access the full ebook. Get instant access for just £9.99.
        </p>
        <Button
          className="btn-brutal h-16 px-12 text-xl w-full"
          onClick={() => navigate("/")}
        >
          Go Back & Purchase
        </Button>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Already purchased? Log in:</h2>
          {/* MagicLoginForm for email login */}
          <MagicLoginForm
            onSuccess={() => window.location.reload()}
            onBack={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
}

// ---- Main Ebook Page ----

export default function Ebook() {
  const [hasAccess, setHasAccess] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [, navigate] = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check access via API
    fetch("/api/check-access")
      .then(res => res.json())
      .then(data => setHasAccess(Boolean(data.hasAccess)))
      .catch(() => setHasAccess(false));
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!hasAccess) {
    return <Paywall />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" ref={wrapperRef}>
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-black text-white flex items-center justify-between px-4 md:px-8 py-3 border-b-4 border-primary">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-black uppercase text-sm tracking-widest">AI Money Blueprint</span>
        </div>
        <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10 uppercase text-xs font-bold tracking-wider" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        {/* Hero Card */}
        <div className="bg-black text-white p-10 md:p-16 text-center mb-10 border-4 border-black shadow-[8px_8px_0px_0px_hsl(var(--primary))]">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">
            £1,000/Month<br />With <span className="text-primary">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-medium">
            The No-BS Blueprint to Your First £1,000 in 30–90 Days
          </p>
        </div>

        {/* Top Coaching CTA */}
        <div className="mb-10 border-2 border-primary/30 bg-primary/5 p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-2">Want Direct Help?</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-5 max-w-2xl mx-auto">
            Book a 1-on-1 session and get personalised support to choose your model, set up your stack, and land your first client faster.
          </p>
          <Button
            className="btn-brutal h-12 md:h-14 px-6 md:px-10 text-sm md:text-lg gap-2 w-full sm:w-auto"
            onClick={() => setContactOpen(true)}
          >
            <Users className="w-4 h-4 md:w-5 md:h-5" />
            Claim Your Coaching Call
          </Button>
        </div>

        {/* Chapter Nav */}
        <ChapterNav onNav={scrollTo} />

        {/* ===== INTRODUCTION ===== */}
        <ChapterCard id="intro" icon="I" label="Introduction" title="Stop Dreaming, Start Doing">
          <p>You bought this because you want money. Not someday. Not "when things align." <strong>Now.</strong></p>
          <p>I'm not here to sell you fairy tales about passive income while you sip margaritas on a beach. I'm here to show you exactly how to make <span className="text-primary font-bold">£1,000/month using AI tools</span> — and I'm going to give you the step-by-step playbook that's already working for thousands of people.</p>
          <p>Here's the truth: AI isn't the future. It's right now. And while everyone else is "learning about it," you're going to be <strong>making money</strong> with it.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">What You'll Get</h3>
          <div className="space-y-3">
            <Step num="✓" title="9 proven AI business models" desc="Models you can start TODAY — each with exact tools, prompts, and workflows — including AI Web Development." variant="good" />
            <Step num="✓" title="Real case studies with real numbers" desc="People who went from £0 to £1,000+/month. Names, locations, timelines." variant="good" />
            <Step num="✓" title="30-60-90 day action roadmap" desc="Exact timeline breakdowns so you know what to do every single day." variant="good" />
            <Step num="✓" title="The 6 traps that kill 90% of AI businesses" desc="And exactly how to avoid every single one of them." variant="good" />
          </div>

          <WarnBox>
            <strong>What you WON'T find here:</strong> Get-rich-quick schemes. "Secret hacks" that don't work. Vague advice about "finding your passion." This is a <strong>work book</strong>. You have to do the work.
          </WarnBox>
        </ChapterCard>

        {/* ===== CHAPTER 1 ===== */}
        <ChapterCard id="ch1" icon="II" label="Chapter 1" title="Why £1,000/Month Changes Everything">
          <p>Most people think small numbers don't matter. They're wrong.</p>
          <p>£1,000/month isn't life-changing money. But it's life-<span className="text-primary font-bold">starting</span> money.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">What £1,000/Month Actually Gives You</h3>
          <div className="space-y-3">
            <Step num="1" title="Proof" desc="Proof that you can make money online. Once you've done it, the doubt disappears forever." />
            <Step num="2" title="Freedom" desc="Freedom to quit the side hustle you hate. £1k/month buys you options." />
            <Step num="3" title="Leverage" desc="Leverage to reinvest and scale. £1k → £5k → £10k → £50k. The first step is the hardest." />
            <Step num="4" title="Confidence" desc="The unshakeable belief that you're not stuck. You have a skill. You have a business." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The AI Advantage — Why Now Is Different</h3>
          <p>Five years ago, starting an online service business required a team:</p>
          <PricingTable
            headers={["Service", "Old Cost", "AI Cost"]}
            rows={[
              ["Website Developer", "£2,000+", "£0 (Lovable + AI tools)"],
              ["Copywriter", "£500+ per page", "£20/month (ChatGPT / Gemini)"],
              ["Graphic Designer", "£300+ per project", "£0 (Canva free tier)"],
              ["Virtual Assistant", "£800+/month", "£0 (AI does it)"],
              ["<strong>Total</strong>", "<strong>£3,600+/month</strong>", "<strong>£20/month</strong>"],
            ]}
          />
          <p>You're not competing with agencies anymore. You're competing with other people who also have AI. And most of them will quit in 30 days.</p>
          <TipBox>
            <strong>Key point:</strong> Don't be most people. The gap between £0 and £1,000 is massive. The gap between £1,000 and £10,000? Much smaller. You just need to cross the first gap.
          </TipBox>
        </ChapterCard>

        {/* ===== CHAPTER 2 ===== */}
        <ChapterCard id="ch2" icon="III" label="Chapter 2" title="The 9 AI Business Models That Actually Work">
          <p>I've tested 47 different AI business models. Most are garbage. These 9 work. Each one includes: what it is, exactly how to do it step-by-step, which tools to use (and how to use them), how to get paid, and a real case study.</p>

          {/* Model 1 — AI Web Development */}
          <ModelCard num={1} title="AI Web Development (Using Lovable)" revenue="£2k–£10k/mo" time="7–21 days to first £" difficulty="Easy-Medium">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> You build stunning, fully functional websites and web apps for businesses — using AI-powered tools like <strong>Lovable</strong> to generate production-ready code in minutes. No traditional coding skills required. You describe what you want, AI builds it, and you deploy it using <strong>VS Code + GitHub Copilot</strong>.</p>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Why Web Development? Why Now?</h4>
            <p className="text-muted-foreground">Every business needs a website. Most pay £3,000–£15,000 to agencies. With AI tools, you can build the same quality in <strong>hours, not weeks</strong>. The profit margins are massive because your "cost" is essentially a few subscriptions.</p>
            <PricingTable
              headers={["What You Build", "Traditional Cost", "Your AI Cost", "You Charge"]}
              rows={[
                ["Landing page", "£1,500–£3,000", "£0 (Lovable free tier)", "£500–£1,500"],
                ["Business website (5 pages)", "£3,000–£8,000", "£20/month (tools)", "£1,500–£4,000"],
                ["Web app / SaaS MVP", "£10,000–£30,000", "£20/month", "£3,000–£10,000"],
                ["E-commerce store", "£5,000–£15,000", "£20/month", "£2,000–£6,000"],
              ]}
            />

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Step-by-Step: How to Do This From Scratch</h4>
            <div className="space-y-3">
              <Step num="1" title="Sign up for Lovable (lovable.dev)" desc="Go to lovable.dev. Create a free account. Lovable lets you describe a website in plain English and generates a fully functional React app with beautiful design — no coding needed." />
              <Step num="2" title="Build your first project in 30 minutes" desc='Type a description like "Build a modern landing page for a dental clinic in Manchester with a booking form, testimonials section, and pricing table." Lovable generates the entire site — design, code, and all.' />
              <Step num="3" title="Refine with conversation" desc='Just chat with Lovable like you would with ChatGPT: "Make the hero section bigger," "Change the colour scheme to blue and white," "Add a contact form." It updates the live preview instantly.' />
              <Step num="4" title="Find businesses that need websites" desc="Use Google Maps. Search local businesses. Look for: no website at all, outdated/ugly websites, sites that aren't mobile-friendly. Make a list of 50." />
              <Step num="5" title="Build a sample site for them (free)" desc="Pick a business from your list. Use Lovable to build a stunning replacement for their site in 1-2 hours. Screenshot it. This is your pitch." />
              <Step num="6" title='Walk in or email: "I rebuilt your website"' desc={'Show them the before (their current site) and after (your Lovable build). Say: "I can make this live for £1,000. Includes hosting setup, mobile-responsive, and a contact form that works."'} />
              <Step num="7" title="Deploy using VS Code + GitHub Copilot" desc="Once they say yes, export the code from Lovable, open it in VS Code, use GitHub Copilot to make final tweaks, and deploy to Vercel or Netlify (both free). Follow the beginner checklist below in order." />
              <Step num="8" title="Create Fiverr + Upwork profiles" desc="Set up one clear service on both platforms: 'AI Website Build (Landing Page)' with one sample screenshot and a fixed starter price. This gives you inbound leads while you do direct outreach." />
            </div>

            <ToolGuide icon="0→1" name="Zero Coding: Exact First Build Checklist" subtitle="If you have never coded before, follow this exactly">
              <ToolStep num="1">Create accounts in this exact order: <strong>Gmail</strong> → <strong>GitHub</strong> → <strong>Lovable</strong> → <strong>Vercel</strong>. Use the same email for all.</ToolStep>
              <ToolStep num="2">In Lovable, click <strong>New Project</strong> and paste this one-line prompt: <strong>"Build a simple one-page site for a plumber in London with services, testimonials, and contact form."</strong></ToolStep>
              <ToolStep num="3">Wait for build to finish. Click each section and test links/buttons. If anything looks wrong, type one fix at a time (example: <strong>"Make text bigger on mobile"</strong>).</ToolStep>
              <ToolStep num="4">When happy, click <strong>Export to GitHub</strong>. Repository name: <code>plumber-london-demo</code>.</ToolStep>
              <ToolStep num="5">Open Vercel, click <strong>Add New Project</strong>, import <code>plumber-london-demo</code>, click <strong>Deploy</strong>.</ToolStep>
              <ToolStep num="6">Copy the live Vercel URL and save it in your portfolio sheet as <strong>Demo #1</strong>. This proves you can ship.</ToolStep>
            </ToolGuide>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Your AI Web Dev Toolkit</h4>
            <ToolGuide icon="💜" name="Lovable — Your AI Website Builder" subtitle="Cost: Free tier available · lovable.dev">
              <ToolStep num="1">Go to <strong>lovable.dev</strong> and sign up with Google or email. The free tier gives you enough to build your first few client projects.</ToolStep>
              <ToolStep num="2"><strong>Start a new project.</strong> Click "New Project" and type a detailed description of what you want to build. Be specific about the business type, sections needed, and style.</ToolStep>
              <ToolStep num="3"><strong>Use this exact prompt format for best results:</strong></ToolStep>
            </ToolGuide>

            <PromptBox label="PROMPT // Lovable Website Build">{`Build a modern, professional website for [Business Name], a [type of business] in [city].

Pages needed:
- Home page with hero section, services overview, testimonials, and CTA
- About page with team bios and company story
- Services page with detailed descriptions and pricing
- Contact page with a working contact form

Design requirements:
- Clean, modern design with lots of white space
- Colour scheme: [primary colour] and [secondary colour]
- Mobile-responsive
- Professional fonts (Inter or similar)
- Include a sticky navigation bar
- Footer with business hours, address, and social media links

Tone: Professional but friendly. Target audience: [describe their customers].`}</PromptBox>

            <ToolGuide icon="💜" name="Lovable — Refining Your Build" subtitle="Iterate until it's perfect">
              <ToolStep num="4"><strong>Review the generated site</strong> in the live preview. Click through every section. Note what needs changing.</ToolStep>
              <ToolStep num="5"><strong>Chat to make changes:</strong> Type things like "Move the testimonials above the pricing section" or "Add a Google Maps embed to the contact page" or "Make the CTA button red and bigger."</ToolStep>
              <ToolStep num="6"><strong>Add advanced features:</strong> "Add a booking calendar" · "Create a FAQ accordion section" · "Add an image gallery with lightbox" · "Build a blog section." Lovable handles all of these.</ToolStep>
              <ToolStep num="7"><strong>Export the code</strong> when you're happy. Click GitHub export in Lovable and create a new repository called <code>client-business-name-site</code>.</ToolStep>
            </ToolGuide>

            <TipBox>
              <strong>Beginner deploy checklist (do this in order):</strong> 1) Install Git from git-scm.com. 2) Create free GitHub account. 3) Export from Lovable to GitHub. 4) Open VS Code and run <code>git clone [repo-url]</code>. 5) Run <code>npm install</code>. 6) Run <code>npm run dev</code>. 7) Check it works before touching deployment.
            </TipBox>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Learning to Deploy: VS Code + GitHub Copilot</h4>
            <p className="text-muted-foreground mb-4">This is where you level up from "AI user" to "developer." Don't worry — it's far easier than you think, and you only need to learn it once. After that, you can deploy any project in under 10 minutes.</p>

            <ToolGuide icon="VS" name="VS Code — Your Code Editor" subtitle="Cost: Free · code.visualstudio.com">
              <ToolStep num="1"><strong>Download VS Code</strong> from <strong>code.visualstudio.com</strong>. Install it. It's free and works on Mac, Windows, and Linux.</ToolStep>
              <ToolStep num="2"><strong>Install Node.js</strong> from <strong>nodejs.org</strong>. Download the LTS version. This lets you run web projects on your computer.</ToolStep>
              <ToolStep num="3"><strong>Install GitHub Copilot extension:</strong> Open VS Code → click the Extensions icon (or Ctrl+Shift+X) → search "GitHub Copilot" → Install. Sign up for the free tier at <strong>github.com/features/copilot</strong>.</ToolStep>
              <ToolStep num="4"><strong>Clone your Lovable project:</strong> Open the terminal in VS Code (Ctrl+`) → type: <code>git clone [your-repo-url]</code> → press Enter. Your project files appear in the sidebar.</ToolStep>
              <ToolStep num="5"><strong>Install dependencies:</strong> In the terminal, type: <code>cd [project-folder] && npm install</code>. Wait for it to finish. Then type: <code>npm run dev</code>. Your site opens in the browser at localhost!</ToolStep>
              <ToolStep num="6"><strong>If terminal says command not found:</strong> close VS Code, reopen it, and run commands one by one: <code>node -v</code>, <code>npm -v</code>, then <code>npm install</code>.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="🤖" name="GitHub Copilot — Your AI Coding Assistant" subtitle="Cost: Free tier available · Works inside VS Code">
              <ToolStep num="1"><strong>Copilot auto-completes your code.</strong> Start typing and it suggests the rest. Press Tab to accept. It understands context — it knows what you're building.</ToolStep>
              <ToolStep num="2"><strong>Ask Copilot questions:</strong> Press Ctrl+I (or Cmd+I on Mac) to open the inline chat. Ask things like: "Add a hamburger menu for mobile" or "Fix the spacing on the footer." It writes the code for you.</ToolStep>
              <ToolStep num="3"><strong>Use Copilot Chat:</strong> Click the Copilot icon in the sidebar. Ask it anything: "How do I deploy this to Vercel?" · "Why is this button not working?" · "Add form validation to the contact form."</ToolStep>
              <ToolStep num="4"><strong>Debug with Copilot:</strong> If something breaks, select the error message → right-click → "Ask Copilot." It explains and fixes the issue.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="🚀" name="Deploying to the Internet — Vercel" subtitle="Cost: Free for personal/small projects · vercel.com">
              <ToolStep num="1">Go to <strong>vercel.com</strong>. Sign up with your GitHub account (the same one linked to your Lovable repo).</ToolStep>
              <ToolStep num="2">Click <strong>"Add New Project"</strong> → Select your Lovable project repository from the list.</ToolStep>
              <ToolStep num="3">Click <strong>"Deploy."</strong> That's it. Vercel builds your site and gives you a live URL like <code>your-project.vercel.app</code>.</ToolStep>
              <ToolStep num="4"><strong>Custom domain (beginner version):</strong> In Vercel, go to Settings → Domains → Add domain. Then log in where the client bought the domain (GoDaddy/Namecheap/etc), copy the exact DNS record Vercel asks for (usually A or CNAME), paste it, and save. DNS can take 5 minutes to 24 hours.</ToolStep>
              <ToolStep num="5"><strong>Every future update:</strong> Make changes in VS Code → save → type <code>git add . && git commit -m "update" && git push</code> in the terminal. Vercel auto-deploys. Client sees changes in 60 seconds.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="GD" name="GoDaddy Domain + DNS (Exact Setup)" subtitle="If the client bought domain on GoDaddy">
              <ToolStep num="1"><strong>Get domain values from Vercel first:</strong> In your Vercel project go to <strong>Settings → Domains</strong> and add both <code>yourdomain.com</code> and <code>www.yourdomain.com</code>.</ToolStep>
              <ToolStep num="2"><strong>Log in to GoDaddy:</strong> Go to <strong>godaddy.com</strong> → Sign In → My Products → find the domain → click <strong>DNS</strong> (or "Manage DNS").</ToolStep>
              <ToolStep num="3"><strong>Add apex/root record:</strong> Type <code>A</code>, Name <code>@</code>, Value <code>76.76.21.21</code>, TTL <code>1 hour</code>. Save. (If Vercel shows a different value, use Vercel's value.)</ToolStep>
              <ToolStep num="4"><strong>Add www record:</strong> Type <code>CNAME</code>, Name <code>www</code>, Value <code>cname.vercel-dns.com</code>, TTL <code>1 hour</code>. Save.</ToolStep>
              <ToolStep num="5"><strong>Remove conflicts:</strong> Delete any old A/CNAME records using <code>@</code> or <code>www</code> that point somewhere else, otherwise verification fails.</ToolStep>
              <ToolStep num="6"><strong>Verify in Vercel:</strong> Go back to Vercel Domains page and click <strong>Refresh</strong>. Wait until both domains show <strong>Valid</strong>. This can take a few minutes to 24 hours.</ToolStep>
              <ToolStep num="7"><strong>Final check:</strong> Open both <code>https://yourdomain.com</code> and <code>https://www.yourdomain.com</code>. Make sure one redirects to your preferred primary domain.</ToolStep>
            </ToolGuide>

            <TipBox>
              <strong>Alternative AI tools for web dev:</strong> Use <strong>Claude</strong> (claude.ai) with Sonnet models for code editing/debugging. Prompt example: <strong>"You are my senior frontend dev. Fix mobile spacing issues in this React component and explain exactly what you changed."</strong>
            </TipBox>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Pricing Your Web Dev Services</h4>
            <PricingTable
              headers={["Package", "Price", "What's Included"]}
              rows={[
                ["Starter", "£500–£1,000", "One-page landing site · Contact form · Mobile responsive · Free hosting setup"],
                ["Business", "£1,500–£3,000", "5-page website · SEO basics · Blog setup · Custom domain · 30-day support"],
                ["Premium", "£3,000–£6,000", "Full web app / e-commerce · Advanced features · 3 months support · Analytics"],
                ["Maintenance", "£200–£500/month", "Monthly updates · Bug fixes · Content changes · Performance monitoring"],
              ]}
            />

            <CaseStudy>
              <p><strong>Aisha, 26, London.</strong> Zero coding experience. Used Lovable to build a website for a local hair salon in 3 hours. Charged £800. The salon owner referred 2 friends. By month 2, she had 5 clients and was making <strong>£3,200/month</strong>. By month 4, she learned VS Code + Copilot and now offers maintenance retainers — adding another <strong>£1,500/month</strong> in recurring revenue.</p>
            </CaseStudy>

            <WarnBox>
              <strong>Don't overcomplicate it.</strong> Your first 3 projects should be simple landing pages and business websites. Master the workflow (Lovable → VS Code → Deploy). Then move to web apps and e-commerce. Crawl, walk, run.
            </WarnBox>

            {/* 1-on-1 Coaching CTA */}
            <div className="bg-primary/5 border-2 border-primary/20 p-6 mt-6 text-center">
              <h4 className="text-xl font-black uppercase mb-2">Want to Learn This 1-on-1?</h4>
              <p className="text-muted-foreground text-sm mb-4">Get personalised coaching from an expert who'll walk you through building and deploying your first web app — step by step.</p>
              <Button
                className="btn-brutal h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-lg gap-2 mx-auto w-full sm:w-auto justify-center"
                onClick={() => setContactOpen(true)}
              >
                <Users className="w-5 h-5" />
                GET 1-ON-1 COACHING
              </Button>
            </div>
          </ModelCard>

          {/* Model 2 */}
          <ModelCard num={2} title="AI Content Writing Service" revenue="£1k–£5k/mo" time="7–14 days to first £" difficulty="Easy">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> You write blog posts, articles, and website copy for businesses — using AI to do 70% of the heavy lifting. You edit, polish, and deliver. They pay you.</p>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Step-by-Step: How to Do This From Scratch</h4>
            <div className="space-y-3">
              <Step num="1" title="Open Google Maps for your city" desc='Search "dentist [your city]" or "plumber [your city]". Click on the first 50 results. Look at their websites. Find ones with bad, outdated, or thin content.' />
              <Step num="2" title='Create a sample "About" page' desc="Pick one of those businesses. Open ChatGPT. Use the prompt below to generate a re-written About page. Edit it to sound human. Save it as a PDF — this is your portfolio piece." />
              <Step num="3" title="Email or walk into the business" desc={`"I noticed your website's About page could be stronger. I rewrote it — here's what it could look like. If you like it, I can do this for £100." Show them the PDF.`} />
              <Step num="4" title="When they say yes, send an invoice" desc="Use PayPal, Stripe, or Wise (see Day 4 payment setup section below). Get paid BEFORE you start the real work." />
              <Step num="5" title="Use AI to draft the final version in 20 minutes" desc="Open ChatGPT, paste in their current page, tell it to rewrite with a specific tone. Edit for 20 minutes. Deliver in 24 hours." />
              <Step num="6" title="Upsell to monthly retainer" desc='"I can also write 4 blog posts per month for £200. This will help your Google ranking." Boom — recurring income.' />
              <Step num="7" title="Create Fiverr + Upwork gigs" desc="Publish one offer called 'Website/About Page Rewrite'. Add your sample PDF, turnaround time, and starting price so clients can find you passively." />
            </div>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">How to Use ChatGPT (or Gemini) for Content Writing</h4>
            <ToolGuide icon="GPT" name="ChatGPT — Your Writing Engine" subtitle="Cost: £20/month for Plus (or free tier to start)">
              <ToolStep num="1">Go to <strong>chat.openai.com</strong> and create a free account. You can start with the free tier — upgrade to Plus (£20/month) once you have your first paying client.</ToolStep>
              <ToolStep num="2">Click "New Chat." In the message box, type a <strong>detailed prompt</strong>. The more detail you give, the better the output. Never just say "write a blog post."</ToolStep>
              <ToolStep num="3"><strong>Use this exact prompt template:</strong></ToolStep>
            </ToolGuide>

            <PromptBox label="PROMPT // About Page Rewrite">{`You are an expert website copywriter. Rewrite the following "About" page for a [type of business] called [business name] in [city].

Current page text:
[paste their current About page text here]

Requirements:
- Tone: Professional but warm and approachable
- Length: 300-400 words
- Include: Their story, what makes them different, a call to action
- Do NOT use phrases like— "In today's digital landscape" or "We pride ourselves"
- Write like a human, not a robot
- End with a clear call to action (book appointment, call us, etc.)`}</PromptBox>

            <ToolGuide icon="GPT" name="ChatGPT — Continued" subtitle="Editing and polishing">
              <ToolStep num="4">Read the output. It'll be 80% good. Now <strong>edit it:</strong> remove any AI-sounding phrases, add specific details about the business, adjust the tone to match their brand.</ToolStep>
              <ToolStep num="5">If it's not right, type "Make it more casual" or "Make it shorter." ChatGPT will revise.</ToolStep>
              <ToolStep num="6">Copy the final version into Google Docs, format it nicely, export as PDF, and send to the client.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="Gr" name="Grammarly — Polishing Your Work" subtitle="Cost: Free (free tier is all you need)">
              <ToolStep num="1">Go to <strong>grammarly.com</strong> and create a free account.</ToolStep>
              <ToolStep num="2">Install the <strong>browser extension</strong> (works in Chrome, Edge, Firefox). It'll check grammar everywhere you type.</ToolStep>
              <ToolStep num="3">Before sending anything to a client, paste it into the Grammarly editor. Fix every error. Takes 2 minutes and makes you look professional.</ToolStep>
            </ToolGuide>

            <CaseStudy>
              <p><strong>James, 34, Manchester.</strong> Started September 2024. First client in 9 days (local gym). Made £600 first month. Month 3: £2,400. Now at £4,200/month with 8 retainer clients.</p>
            </CaseStudy>
          </ModelCard>

          {/* Model 3 */}
          <ModelCard num={3} title="AI Social Media Management" revenue="£800–£3k/mo" time="14–21 days to first £" difficulty="Medium">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> You manage Instagram, Facebook, and/or LinkedIn for small businesses. You create their posts, write their captions, design their graphics, and schedule everything — all using AI tools. They pay you monthly.</p>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Step-by-Step: How to Do This From Scratch</h4>
            <div className="space-y-3">
              <Step num="1" title="Find businesses with weak social media" desc="Open Instagram. Search location tags for your city. Find businesses with under 5,000 followers who haven't posted in 2+ weeks. Make a list of 50." />
              <Step num="2" title='Create a sample "30 days of content"' desc="Pick a business. Use ChatGPT to generate 30 post ideas + captions. Design 5 sample graphics in Canva. Put it all in a Google Doc." />
              <Step num="3" title="DM or email the business owner" desc='"I created 30 days of content ideas for your Instagram — for free. Want to see them? If you like them, I can run your socials for £300/month."' />
              <Step num="4" title="Once they say yes, batch-create the content" desc="Use ChatGPT for all 30 captions (~1 hour). Use Canva for 30 graphics (~3 hours). Schedule everything using Buffer." />
              <Step num="5" title="Schedule posts automatically" desc="Use Buffer (free for up to 3 channels) to schedule all 30 posts at once. Set it and forget it." />
              <Step num="6" title="After 30 days, offer a retainer" desc='"Your engagement went up 40%. Want me to keep going? £400/month for 3 platforms."' />
              <Step num="7" title="Create Fiverr + Upwork gigs" desc="Publish an offer like 'Monthly Social Media Content + Scheduling'. Add one sample carousel and 3 captions as portfolio proof." />
            </div>

            <PromptBox label="PROMPT // 30 Social Media Posts">{`You are a social media manager for a [type of business] called [name] in [city]. 

Create 30 Instagram post ideas with full captions for the next 30 days.

Mix of content types:
- 8 educational posts (tips related to their industry)
- 8 behind-the-scenes / personal posts
- 6 promotional posts (their services/products)
- 4 engagement posts (questions, polls, this-or-that)
- 4 testimonial/review highlight posts

For each post include:
1. Post idea (1 sentence)
2. Full caption (100-200 words)
3. 5-10 relevant hashtags
4. Best time to post (morning/afternoon/evening)

Tone: Friendly, professional, not salesy.`}</PromptBox>

            <ToolGuide icon="Ca" name="Canva — Designing Graphics" subtitle="Cost: Free (Pro is £10/month but not needed)">
              <ToolStep num="1">Go to <strong>canva.com</strong> and create a free account.</ToolStep>
              <ToolStep num="2">Click <strong>"Create a Design"</strong> → choose <strong>"Instagram Post (Square)"</strong> (1080x1080).</ToolStep>
              <ToolStep num="3">Search templates in the sidebar. Pick a template that matches their brand colours.</ToolStep>
              <ToolStep num="4"><strong>Edit the text</strong> to match your ChatGPT caption. Change colours to match the client's brand.</ToolStep>
              <ToolStep num="5">Click <strong>"Share" → "Download"</strong> → PNG format. Takes about 5 minutes per graphic.</ToolStep>
              <ToolStep num="6"><strong>Faster design option:</strong> Use Google Gemini image prompts with a "Nana Banana" style prompt pattern to quickly generate visual concepts, then import into Canva and add brand text/logo.</ToolStep>
              <ToolStep num="7"><strong>Pro tip:</strong> Create 3 templates and rotate them for visual consistency.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="Bu" name="Buffer — Scheduling Posts" subtitle="Cost: Free for up to 3 social media channels">
              <ToolStep num="1">Go to <strong>buffer.com</strong> and create a free account.</ToolStep>
              <ToolStep num="2">Click <strong>"Connect Channel"</strong> → connect the client's Instagram/Facebook.</ToolStep>
              <ToolStep num="2b">Ask client to add you as admin/editor first (Meta Business Suite for Facebook/Instagram) so you don't need their password.</ToolStep>
              <ToolStep num="3">Click <strong>"Create Post"</strong> → upload graphic → paste caption → select date/time.</ToolStep>
              <ToolStep num="4">Repeat for all 30 posts. Schedule the entire month in 1-2 hours.</ToolStep>
              <ToolStep num="5">Buffer will auto-post. Check in once a week to reply to comments.</ToolStep>
            </ToolGuide>

            <PricingTable
              headers={["Package", "Price", "What's Included"]}
              rows={[
                ["Starter", "£300 one-time", "30 posts, 1 platform, 30-day trial"],
                ["Growth", "£400/month", "30 posts, 3 platforms, monthly reporting"],
                ["Premium", "£600/month", "45 posts + stories + reels scripting"],
              ]}
            />

            <CaseStudy>
              <p><strong>Sarah, 28, Bristol.</strong> Started with local coffee shop. Grew their Instagram from 800 to 3,400 followers in 90 days. Now manages 5 businesses at £400/month each = <strong>£2,000/month.</strong></p>
            </CaseStudy>
          </ModelCard>

          {/* Model 4 */}
          <ModelCard num={4} title="AI-Powered Email Sequences" revenue="£500–£2k/project" time="21–30 days to first £" difficulty="Medium">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> You write automated email sequences for businesses — welcome sequences, sales funnels, follow-up series. Most businesses know they need this but have zero idea how to write the emails.</p>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Step-by-Step: How to Do This From Scratch</h4>
            <div className="space-y-3">
              <Step num="1" title="Learn the basics (2 hours)" desc='Watch 3-4 free YouTube videos on "email welcome sequences." Understand: what a welcome sequence is, what a sales funnel is, and what makes a good subject line.' />
              <Step num="2" title="Find businesses with no automation" desc="Go to websites of coaches, e-commerce shops. Sign up for their email list. If no welcome email in 24 hours, they need you." />
              <Step num="3" title="Write a sample 5-email welcome sequence" desc="Use ChatGPT with the prompt below. Edit each email for voice. Save as a Google Doc — this is your portfolio." />
              <Step num="4" title="Pitch the business owner" desc={`"I noticed you don't have a welcome email sequence. I wrote a sample one. Full 5-email sequence for £500, delivered in 48 hours."`} />
              <Step num="5" title="Deliver with setup instructions" desc="Write the emails + provide step-by-step instructions for Mailchimp or ConvertKit (or offer setup for extra £100)." />
              <Step num="6" title="Create Fiverr + Upwork gigs" desc="Add an offer called '5-Email Welcome Sequence'. Upload one redacted sample and list exact deliverables." />
            </div>

            <PromptBox label="PROMPT // 5-Email Welcome Sequence">{`Write a 5-email welcome sequence for [business name], a [type of business] that sells [products/services].

Email 1 (Day 0 — Immediate): Welcome + deliver lead magnet + introduce who they are
Email 2 (Day 2): Share their story / origin / why they started
Email 3 (Day 4): Provide massive value (tips, how-to related to their industry)
Email 4 (Day 6): Social proof — customer results, testimonials, case studies
Email 5 (Day 8): Soft pitch — introduce their main offer with clear CTA

For each email include:
- Subject line (+ 2 alternatives)
- Full email body (150-300 words)
- Clear call-to-action
- Tone: Conversational, helpful, not pushy`}</PromptBox>

            <p><strong>The maths:</strong> You write the sequence in 3-4 hours using AI. You charge £500. That's <strong>£125/hour.</strong> Do 2-3 per month = £1,000-£1,500.</p>

            <CaseStudy>
              <p><strong>Marcus, 41, London.</strong> Former sales manager. Built portfolio by doing 2 free sequences for friends' businesses. Now charges £800 per sequence. Does 3-4/month = <strong>£2,400-£3,200/month.</strong></p>
            </CaseStudy>
          </ModelCard>

          {/* Model 5 */}
          <ModelCard num={5} title="AI Video Script Writing" revenue="£1k–£4k/mo" time="14–30 days to first £" difficulty="Advanced">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> You write scripts for YouTubers, TikTokers, and businesses making video ads. Most creators hate writing. You use AI to analyse their best videos and create scripts that follow the same pattern.</p>

            <h4 className="font-bold uppercase text-sm text-primary mt-6 mb-3">Step-by-Step</h4>
            <div className="space-y-3">
              <Step num="1" title="Find YouTubers with 10k-100k subscribers" desc="They have money but no writing team. Search your niche. Look for channels that upload weekly." />
              <Step num="2" title="Analyse their top 3 videos" desc="Watch them. Note the structure: hook, intro, main points, transitions, CTA. Paste transcript into ChatGPT to identify the pattern." />
              <Step num="3" title="Write a sample script for them" desc="Use ChatGPT for a video they haven't made yet. Match their tone and structure. Include title ideas and thumbnail concepts." />
              <Step num="4" title="DM them on Instagram/Twitter" desc='"I wrote a free script for your channel. Want me to send it? I write 4 scripts/month for £200."' />
              <Step num="5" title="Create Fiverr + Upwork gigs" desc="Create one clear offer: 'YouTube Script Writing (10-min video)'. Include 1 sample script and 3 title examples." />
            </div>

            <PromptBox label="PROMPT // YouTube Script">{`Write a YouTube video script for a [niche] channel about [topic].

Structure:
- HOOK (0-30 sec): Start with a bold claim or question that stops scrolling
- INTRO (30-60 sec): Brief intro, what they'll learn, why it matters
- MAIN CONTENT (5-8 min): 3-5 key points with examples and stories
- CTA (30 sec): Subscribe, comment, check link in description

Style notes:
- Conversational, like talking to a friend
- Short sentences and paragraphs
- Include [PAUSE] markers and [B-ROLL SUGGESTION] notes
- Add 3 title options and thumbnail text ideas at the end

Total length: ~1500 words (roughly 10-minute video)`}</PromptBox>

            <p><strong>Scaling path:</strong> Start at £50/script → prove your scripts get views → raise to £100/script → get 3-4 creators on retainer = £800-£1,600/month each.</p>

            <CaseStudy>
              <p><strong>Emma, 25, Leeds.</strong> Started writing scripts for finance YouTubers. First client paid £150 for 3 scripts. Client's channel grew 40%. Now writes for 4 creators at £600/month each = <strong>£2,400/month.</strong></p>
            </CaseStudy>
          </ModelCard>

          {/* Model 6 */}
          <ModelCard num={6} title="AI Business Name & Brand Identity" revenue="£300–£1k/project" time="7–14 days to first £" difficulty="Easy">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> New businesses need names, taglines, and brand voice guides. You create all of this using AI and deliver a professional brand package in a PDF.</p>
            <div className="space-y-3">
              <Step num="1" title="Find new businesses" desc="Go to Companies House register. Search businesses registered in the last 30 days. They need branding NOW." />
              <Step num="2" title="Create a sample brand guide" desc="Use ChatGPT to generate: 10 name options, 5 taglines, a brand voice guide, sample About copy, and social media bios. Design in Canva." />
              <Step num="3" title="Email new business founders" desc='"Congrats on registering [business name]! I help new businesses build their brand identity. Full package is £500."' />
              <Step num="4" title="Deliver a 15-page brand guide" desc="Use ChatGPT for all copy. Use Canva for design. Deliver as a beautiful PDF. Takes 4-5 hours total." />
              <Step num="5" title="Create Fiverr + Upwork gigs" desc="Publish offer 'Brand Name + Voice Guide Package'. Show 2 sample naming sets and one mini brand guide page." />
            </div>
            <CaseStudy>
              <p><strong>Tom, 32, Birmingham.</strong> Created packages for 8 startups in first 60 days. Average £600/project. Now does 3-4/month at £800 each = <strong>£2,400-£3,200/month.</strong></p>
            </CaseStudy>
          </ModelCard>

          {/* Model 7 */}
          <ModelCard num={7} title="AI SEO Content Clusters" revenue="£800–£2k/cluster" time="30–45 days to first £" difficulty="Advanced">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> You create a cluster of 10-15 blog posts around one keyword topic. This helps businesses rank on Google and drive organic traffic.</p>
            <div className="space-y-3">
              <Step num="1" title="Find businesses with no blog" desc={`Google "[industry] + [your city]." Visit websites. If zero blog posts, they're leaving traffic on the table.`} />
              <Step num="2" title="Research keywords using Ubersuggest" desc="Go to neilpatel.com/ubersuggest. Pick keywords with SEO difficulty under 35, search volume above 200/month, and clear buyer intent." />
              <Step num="3" title="Use AI to draft all 10-15 posts" desc="One prompt per post in ChatGPT. Each post: 800-1500 words, SEO-optimised. Edit each for 30-60 minutes." />
              <Step num="4" title="Deliver with a publishing schedule" desc="Give them a 6-week calendar. Charge £800-£2,000 per cluster depending on the niche." />
              <Step num="5" title="Create Fiverr + Upwork gigs" desc="Offer '10-Post SEO Content Cluster'. Include keyword sheet + publishing calendar as deliverables." />
            </div>
            <CaseStudy>
              <p><strong>Raj, 29, London.</strong> Built content clusters for law firms. Charges £1,500 per cluster. Does 2/month. Just raised prices to <strong>£2,000.</strong></p>
            </CaseStudy>
          </ModelCard>

          {/* Model 8 */}
          <ModelCard num={8} title="AI Ad Copy Testing Packs" revenue="£500–£1.5k/pack" time="21–30 days to first £" difficulty="Advanced">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> Businesses running Facebook/Google ads usually only test 1-2 variations. You create 20-30 variations. The winning one can 2-5x their ROI.</p>
            <div className="space-y-3">
              <Step num="1" title="Study winning ads (1 day)" desc="Go to Facebook Ad Library. Search your target niche. Save 20-30 winning ads in a Google Doc." />
              <Step num="2" title="Find businesses with weak ad copy" desc="Search the Ad Library for local businesses running the same 1-2 ads for months. They need fresh variations." />
              <Step num="3" title="Use AI to generate 30 ad variations" desc="Feed ChatGPT their current ad + your swipe file. Ask for 10 headline, 10 body copy, and 10 CTA variations." />
              <Step num="4" title="Deliver as a spreadsheet" desc="Google Sheets: Headlines, Body Copy, CTAs, Recommended combinations. Charge £600-£1,200." />
              <Step num="5" title="Create Fiverr + Upwork gigs" desc="Publish '30 Ad Copy Variations Pack' with a sample sheet so clients understand exactly what they receive." />
            </div>
            <CaseStudy>
              <p><strong>Lucy, 35, Manchester.</strong> First client spent £12k on ads with 1 variation. Her pack helped them find a winner that 3x'd ROI. Now charges £1,200/pack. Does 2-3/month = <strong>£2,400-£3,600.</strong></p>
            </CaseStudy>
          </ModelCard>

          {/* Model 9 */}
          <ModelCard num={9} title="AI Course Outline Creation" revenue="£400–£1.2k/outline" time="14–21 days to first £" difficulty="Medium">
            <p className="text-muted-foreground"><strong className="text-foreground">What it is:</strong> Coaches and experts all "want to create a course." They never do because structuring 30+ lessons is overwhelming. You do it in a day using AI.</p>
            <div className="space-y-3">
              <Step num="1" title="Find coaches on Instagram/LinkedIn" desc="Search #lifecoach #businesscoach #fitnesscoach. Look for people with 5k-50k followers who sell 1-on-1 services." />
              <Step num="2" title="DM or email them" desc='"I help coaches turn their expertise into a structured online course. I handle the outline, lesson plans, workbooks — you just record."' />
              <Step num="3" title="Use AI to build the course outline" desc='ChatGPT: "Create a 6-module course outline. Each module has 5-6 lessons. Include descriptions, learning outcomes, exercises, and quiz questions."' />
              <Step num="4" title="Deliver a complete course blueprint" desc="6-8 modules, 30-40 lesson descriptions, script outlines, workbook template, quiz ideas. All in a beautiful PDF. Charge £500-£1,200." />
              <Step num="5" title="Create Fiverr + Upwork gigs" desc="Offer 'Course Outline + Lesson Plan Package' and show 1 sample module outline in your portfolio." />
            </div>
            <CaseStudy>
              <p><strong>David, 38, Edinburgh.</strong> Created 11 course outlines in 90 days. Average £650/project. Month 3: £4,550. Now pre-booked <strong>2 months out.</strong></p>
            </CaseStudy>
          </ModelCard>
        </ChapterCard>

        {/* ===== CHAPTER 3 ===== */}
        <ChapterCard id="ch3" icon="IV" label="Chapter 3" title="Your First 7 Days (The Foundation)">
          <p>You can't make money until you're in business. Here's your <strong>exact day-by-day checklist</strong> for week one. No guessing. No excuses.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Day 1: Choose Your Model</h3>
          <div className="space-y-3">
            <Step num="1" title="Pick ONE model from Chapter 2" desc="Not three. Not 'maybe this one or that one.' ONE. Write it down on paper right now. This is your focus for 90 days." />
            <Step num="2" title="Ask yourself these 3 questions" desc="Which model excites me most? Which matches skills I already have? Which one can I get my first client for fastest?" />
          </div>
          <TipBox>
            <strong>Not sure which to pick?</strong> Start with Model 1 (Web Development) if you want the highest earning potential, or Model 2 (Content Writing) or Model 3 (Social Media) for the easiest start.
          </TipBox>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Day 2: Learn the Tools (4-6 hours)</h3>
          <p>Spend today practising. Get comfortable with AI before you sell AI-powered services.</p>

          <ToolGuide icon="GPT" name="ChatGPT — Complete Setup Guide" subtitle="This is your #1 tool. Master this first.">
            <ToolStep num="1">Go to <strong>chat.openai.com</strong>. Click "Sign Up." The free tier is fine to start.</ToolStep>
            <ToolStep num="2">Click <strong>"New Chat"</strong> in the top-left. This starts a blank conversation.</ToolStep>
            <ToolStep num="3"><strong>Understanding prompts:</strong> The more specific your prompt, the better the output. Think of it like giving instructions to a very smart intern.</ToolStep>
            <ToolStep num="4"><strong>Practice exercise:</strong> Generate 10 versions of the same content (e.g., an About page for a dentist). See how output changes with detail. Save best prompts.</ToolStep>
            <ToolStep num="5"><strong>Key skill — iterating:</strong> The first output is rarely perfect. Type follow-ups like "Make it shorter" or "Remove the cliché in paragraph 2."</ToolStep>
            <ToolStep num="6"><strong>When to upgrade to Plus (£20/month):</strong> Once you have your first paying client.</ToolStep>
          </ToolGuide>

          <ToolGuide icon="Ge" name="Google Gemini — Your AI Research & Coding Companion" subtitle="Free with your Google account · gemini.google.com">
            <ToolStep num="1">Go to <strong>gemini.google.com</strong>. Sign in with your Google account. Completely free.</ToolStep>
            <ToolStep num="2"><strong>Great for research:</strong> Gemini has access to Google Search, making it excellent for researching industries, finding data points, and getting up-to-date information for client projects.</ToolStep>
            <ToolStep num="3"><strong>Code generation:</strong> Ask Gemini to write code snippets, debug errors, or explain technical concepts. Particularly useful when working on web development projects.</ToolStep>
            <ToolStep num="4"><strong>Content alternative:</strong> If ChatGPT gives you generic output, try the same prompt in Gemini. Different AI models have different strengths — use both to get the best results.</ToolStep>
            <ToolStep num="5"><strong>Pro tip:</strong> Use Gemini for fact-checking and research, ChatGPT for creative writing. Together they're unstoppable.</ToolStep>
          </ToolGuide>

          <TipBox>
            <strong>Day 2 done checklist:</strong> You are done only when you have 1) one saved ChatGPT prompt template, 2) one saved Gemini prompt template, 3) one final polished sample output in Google Doc/PDF, and 4) one folder called "Client Prompts" with your best prompts.
          </TipBox>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Day 3: Build Your Portfolio (8 hours)</h3>
          <div className="space-y-3">
            <Step num="1" title="Create 3 sample pieces of work" desc="You don't need real clients. Make up businesses. Make them industry-specific so prospects see themselves in your work." />
            <Step num="2" title="Polish until genuinely impressive" desc="Run through Grammarly. Format nicely in Google Docs. Export as PDFs. These 3 pieces ARE your business right now." />
            <Step num="3" title="Create a simple portfolio page" desc="Google Drive (free): create a folder, put your 3 PDFs, share the link. Or Notion (free). Don't spend more than 1 hour." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Day 4: Set Up Payment & Infrastructure</h3>

          <div className="bg-green-50 border-2 border-green-200 p-5 my-4">
            <h4 className="font-bold uppercase text-green-800 mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> How to Get Paid — Complete Setup Guide</h4>
            <p className="text-sm text-muted-foreground mb-4">You need at least ONE payment method ready before you start outreach.</p>

            <ToolGuide icon="PP" name="PayPal — Easiest to Start" subtitle="Best for: Your first 1-5 clients">
              <ToolStep num="1">Go to <strong>paypal.com</strong> → Sign Up → Choose <strong>"Business Account"</strong>.</ToolStep>
              <ToolStep num="2">Enter your name, email, and password. Add your bank account.</ToolStep>
              <ToolStep num="3">To send an invoice: Click <strong>"Send & Request"</strong> → "Create Invoice" → Enter client's email and amount.</ToolStep>
              <ToolStep num="4">Click <strong>"Send Invoice."</strong> Money goes to your PayPal. Transfer to bank takes 1-2 days.</ToolStep>
              <ToolStep num="5"><strong>Fees:</strong> ~2.9% + 30p per transaction. On £200, you receive ~£193. Factor into pricing.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="St" name="Stripe — Most Professional" subtitle="Best for: Retainer clients & recurring payments">
              <ToolStep num="1">Go to <strong>stripe.com</strong> → "Start Now" → Create account.</ToolStep>
              <ToolStep num="2">Complete identity verification (upload ID, bank details). 1-2 days to approve.</ToolStep>
              <ToolStep num="3">Create invoices: Dashboard → "Invoices" → "Create Invoice."</ToolStep>
              <ToolStep num="4"><strong>Recurring payments:</strong> "Subscriptions" → Create subscription for monthly retainers.</ToolStep>
              <ToolStep num="5"><strong>Payment Links:</strong> Create a link, send to clients. They click, pay, done.</ToolStep>
              <ToolStep num="6"><strong>Fees:</strong> 1.4% + 20p for UK cards. Slightly better than PayPal.</ToolStep>
            </ToolGuide>

            <ToolGuide icon="Wi" name="Wise — Best for International Clients" subtitle="Best for: Clients outside the UK">
              <ToolStep num="1">Go to <strong>wise.com</strong> → Sign up → Verify identity.</ToolStep>
              <ToolStep num="2">You get account details in GBP, USD, EUR, and more.</ToolStep>
              <ToolStep num="3">Best for larger invoices (£500+) with very low flat fees.</ToolStep>
            </ToolGuide>
          </div>

          <div className="space-y-3">
            <Step num="✓" title="Set up professional email" desc="firstname.lastname@gmail.com is fine. Google Workspace (£5/month) for custom domain is optional." variant="good" />
            <Step num="✓" title="Portfolio host" desc="Google Drive link (free) or Notion page (free) or Carrd website (£15/year). Don't spend more than 30 minutes." variant="good" />
          </div>

          <PromptBox label="TEMPLATE // First Invoice Message">{`Hi [Client Name],

Great speaking with you today.

As agreed, here is your invoice for:
- Deliverable: [what they are buying]
- Amount: £[amount]
- Delivery timeline: [date/time]

Once payment is received, I will start immediately.

Thanks,
[Your Name]`}</PromptBox>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Days 5-7: Start Outreach</h3>
          <div className="space-y-3">
            <Step num="1" title="Build a list of 50-100 potential clients" desc='Google "[your city] + [target business type]." Check LinkedIn. Search Instagram local hashtags. In your Google Sheet add columns: Business Name, Contact Name, Email, Phone/DM, Source URL, First Contact Date, Follow-up Date, Status.' />
            <Step num="2" title="Send 10 outreach messages per day" desc="Use the template below. Personalise each one. Don't copy-paste generic messages." />
            <Step num="3" title="Follow up after 3 days" desc='"Hey [Name], just bumping this up. Happy to jump on a quick call this week." 80% of sales happen in the follow-up.' />
          </div>

          <PromptBox label="TEMPLATE // Outreach Email">{`Subject: Quick question about [their business name]

Hi [Name],

I noticed [specific observation — e.g., "your website doesn't have a blog" or "you haven't posted on Instagram in 3 weeks"].

I help [business type] with [specific outcome] using AI-powered tools — which means I can deliver faster and cheaper than a traditional agency.

I put together a quick sample of what I could do for [their business name]. Would you be open to a 15-min call this week?

[Your name]
[Link to portfolio]
[Your email / phone number]`}</PromptBox>

          <TipBox>
            <strong>Pro tip:</strong> Don't ask "Are you interested?" (easy to say no). Ask "Would you be open to a quick call?" (harder to refuse). The goal of the email isn't to sell — it's to get a conversation started.
          </TipBox>
        </ChapterCard>

        {/* ===== CHAPTER 4 ===== */}
        <ChapterCard id="ch4" icon="V" label="Chapter 4" title="Getting Your First Client (Days 8-30)">
          <p>Your first client is the hardest. After that, everything gets easier. Here's the exact system for closing your first sale.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The Offer Formula</h3>
          <p>Make an offer so good they feel stupid saying no.</p>
          <div className="space-y-3">
            <Step num="✗" title="Bad offer" desc={`"I'll write content for you"`} variant="bad" />
            <Step num="✓" title="Good offer" desc={`"I'll write 3 blog posts for £200. If you're not happy, you pay nothing. Delivered in 48 hours."`} variant="good" />
          </div>
          <p className="mt-3">The good offer has: a specific deliverable, a clear price, a guarantee, and a timeline. This eliminates risk and makes the decision easy.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The Pricing Strategy</h3>
          <PricingTable
            headers={["Stage", "Pricing", "Why"]}
            rows={[
              ["First 3 clients", "50% of target rate", "Get testimonials, build confidence, learn fast"],
              ["Clients 4-10", "75% of target rate", "You have proof it works. Charge more."],
              ["Client 11+", "Full rate", "Portfolio, testimonials, and experience"],
            ]}
          />
          <p><strong>Example:</strong> Target £600/month → Clients 1-3: £300 → Clients 4-10: £450 → Client 11+: £600.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Where to Find Clients (Best to Worst)</h3>
          <div className="space-y-3">
            <Step num="1" title="Your network (fastest)" desc={`"Hey, do you know any small businesses that need help with [outcome]?" You'll be surprised how many leads this generates.`} />
            <Step num="2" title="Local businesses (high trust)" desc="Walk in with your portfolio on your phone or a printed sample. Business owners trust face-to-face." />
            <Step num="3" title="LinkedIn (professional)" desc="Comment on business owners' posts for 1-2 weeks. Provide value. Then DM them with your offer." />
            <Step num="4" title="Facebook Groups (volume)" desc='Join groups like "Small Business Owners UK." Answer questions. Be helpful. Then mention your service.' />
            <Step num="5" title="Cold email (scalable)" desc="Build lists from Google Maps and LinkedIn. Send personalised emails. Slowest but most scalable." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The Discovery Call (15 Minutes)</h3>
          <div className="space-y-3">
            <Step num="1" title="Ask about their business (5 min)" desc='"Tell me about your business. What do you do? Who are your customers?" Let them talk. Listen.'/>
            <Step num="2" title="Find the pain point (3 min)" desc={`"What's your biggest challenge with [marketing/content/social media]?" That's what you solve.`}/>
            <Step num="3" title="Present your solution (5 min)" desc={`"I can help with that. Here's what I'd do..." Show your portfolio. Explain process, timeline, and price.`}/>
            <Step num="4" title="Close (2 min)" desc='"Want to move forward?" If yes: send invoice immediately. Start work once paid.'/>
          </div>

          <WarnBox>
            <strong>Handling common objections:</strong><br />
            "It's too expensive" → "What if I did a trial project for half price?"<br />
            "I need to think about it" → "Totally understand. What specifically do you need to think about?"<br />
            "I'm not sure it'll work" → "That's why I'm offering a guarantee — if you're not happy, you don't pay."
          </WarnBox>

          <CaseStudy>
            <p><strong>Sophie, 27, Cardiff.</strong> Day 12: First response (physio clinic). Day 14: Discovery call. Day 15: Sent proposal (£200 for 3 blog posts). Day 16: Got paid. Day 19: Delivered. Day 20: Client asked for £400/month retainer.</p>
            <p><strong>Her secret?</strong> She walked into the clinic, spoke to the owner, and showed sample work on her phone. No fancy pitch deck.</p>
          </CaseStudy>
        </ChapterCard>

        {/* ===== CHAPTER 5 ===== */}
        <ChapterCard id="ch5" icon="VI" label="Chapter 5" title="Delivering Quality (Not Just AI Slop)">
          <p>AI makes you fast. But fast garbage is still garbage. Your clients are paying for <strong>quality</strong>, not speed.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The 70/30 Rule</h3>
          <p>Let AI do 70% of the work. You do the 30% that makes it great.</p>
          <PricingTable
            headers={["AI Does (70%)", "You Do (30%)"]}
            rows={[
              ["First drafts", "Strategy and positioning"],
              ["Structure and outlines", "Brand voice and personality"],
              ["Research and data", "Fact-checking and editing"],
              ["Multiple variations", "Client-specific customisation"],
            ]}
          />

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The AI-to-Quality Workflow</h3>
          <div className="space-y-3">
            <Step num="1" title="Strategy (15% of your time)" desc="Before you open ChatGPT, understand: What does the client want? Who is their audience? What does success look like?" />
            <Step num="2" title="AI Generation (30% of your time)" desc="Write detailed prompts. Generate 2-3 versions. Pick the best one as your starting point." />
            <Step num="3" title="Human Polish (40% of your time)" desc="Edit for clarity. Add personality. Remove AI-sounding phrases. Inject specific examples and stories." />
            <Step num="4" title="Client Refinement (15% of your time)" desc="Send for feedback. Make revisions quickly. Over-deliver slightly." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Phrases That Scream "AI Wrote This"</h3>
          <WarnBox>
            <strong>Never send copy that contains these:</strong><br />
            — "In today's digital landscape..."<br />
            — "Dive deep into..."<br />
            — "Unlock the power of..."<br />
            — "In conclusion..."<br />
            — "It's worth noting that..."<br />
            — "Delve into..."<br />
            — "Navigate the complexities..."<br /><br />
            <strong>Replace with:</strong> Direct statements. Short sentences. Specific examples. Your client's actual voice.
          </WarnBox>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The Over-Delivery Trick</h3>
          <p>Always deliver 110%. This is how you get referrals, testimonials, and retainer clients.</p>
          <div className="space-y-3">
            <Step num="+" title="They ordered 3 blog posts?" desc="Give them 3 posts + 5 social media captions pulled from the posts." variant="good" />
            <Step num="+" title="They wanted an email sequence?" desc="Add 3 extra subject line variations for each email." variant="good" />
            <Step num="+" title="They hired you for scripts?" desc="Include thumbnail text ideas and SEO-optimised video descriptions." variant="good" />
          </div>
          <TipBox>
            <strong>The bonus hack:</strong> The extra items take you 15-20 minutes with AI. But to the client, it feels like you went above and beyond. This turns one-off clients into retainer clients who refer friends.
          </TipBox>
        </ChapterCard>

        {/* ===== CHAPTER 6 ===== */}
        <ChapterCard id="ch6" icon="VII" label="Chapter 6" title="Scaling from £1,000 to £3,000/Month">
          <p>You hit £1,000. Great. Don't celebrate yet. Here's how to 3x it.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The Three Scaling Levers</h3>
          <div className="space-y-3">
            <Step num="1" title="Raise Prices" desc="Every 10 clients, raise prices 20%. Start: £500 → After 10: £600 → After 20: £720 → After 30: £864. Same work, more money." />
            <Step num="2" title="Get Retainers (Recurring Revenue)" desc="One-off £500 project → £400/month retainer × 12 months = £4,800 from one client. This builds predictable income." />
            <Step num="3" title="Increase Capacity" desc="Better AI workflows. Templates. Hire a VA for basic tasks (£8/hour on Fiverr). Say no to low-value work." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The Productized Service Model</h3>
          <p>Stop custom-quoting everything. Create packages so clients can pick one and pay instantly.</p>
          <PricingTable
            headers={["Package", "Price", "Includes"]}
            rows={[
              ["Bronze", "£400/month", "4 blog posts per month"],
              ["Silver", "£800/month", "8 blog posts + social media captions"],
              ["Gold", "£1,500/month", "12 blog posts + social + email newsletter"],
            ]}
          />
          <p><strong>The maths:</strong> 3 Silver clients = £2,400/month. 2 Gold clients = £3,000/month. That's life-changing money with 2-5 clients.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Getting Clients to Stay</h3>
          <div className="space-y-3">
            <Step num="✓" title="Deliver on time — always" desc="Late delivery is the #1 reason clients leave. Set realistic deadlines and hit them every time." variant="good" />
            <Step num="✓" title="Communicate proactively" desc={`Don't make them chase you. Send weekly updates. "Here's what I'm working on this week."`} variant="good" />
            <Step num="✓" title="Show results with monthly reports" desc="Track metrics: page views, engagement, email opens. Clients who see results don't cancel." variant="good" />
            <Step num="✓" title="Ask for referrals" desc={`"Do you know any other business owners who might need this?" 60% of Oliver's clients came from referrals.`} variant="good" />
          </div>

          <CaseStudy>
            <p><strong>Oliver, 31, Liverpool.</strong> Month 1: £800 → Month 2: £1,600 → Month 3: £2,800 → Month 4: £3,400</p>
            <p>His secret? Every single client was asked for a referral. 60% of his new clients came from existing client referrals.</p>
          </CaseStudy>
        </ChapterCard>

        {/* ===== CHAPTER 7 ===== */}
        <ChapterCard id="ch7" icon="VIII" label="Chapter 7" title="Avoiding the 6 Traps That Kill AI Businesses">
          <p>Most people fail. Not because the models don't work — but because they fall into these traps.</p>

          <div className="space-y-3 mt-6">
            <Step num="1" title="Trap #1: Shiny Object Syndrome" desc="You start content writing. Then social media. Then AI art. Result: You master nothing. FIX: Pick ONE model. Do it for 90 days minimum." variant="bad" />
            <Step num="2" title="Trap #2: Underpricing to Death" desc="Charging £50 for 4 hours of work = £12.50/hour. FIX: Price based on value, not hours. If your blog post makes them £5,000, charging £500 is a bargain." variant="bad" />
            <Step num="3" title="Trap #3: No Systems" desc="Every project is custom. You reinvent the wheel. FIX: Create templates, workflows, and processes. Save your best prompts." variant="bad" />
            <Step num="4" title="Trap #4: Poor Client Selection" desc={`You take every client who'll pay — including nightmares. FIX: Fire bad clients. Red flags: "I need this yesterday" · "My budget is £50 but..."`} variant="bad" />
            <Step num="5" title="Trap #5: Relying on One Client" desc="One client pays £2,000/month. They cancel. You're at £0. FIX: Never let one client be more than 40% of your revenue." variant="bad" />
            <Step num="6" title="Trap #6: Not Building an Audience" desc="You only get clients through outreach. If you stop, clients stop. FIX: Post your work publicly. Share client wins. Let clients come to you." variant="bad" />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">The 90-Day Failure Prevention Checklist</h3>
          <p className="mb-4">Do these every single week. If you do this for 90 days, you <strong>will not fail.</strong></p>
          <div className="space-y-2">
            {[
              "Send 20 outreach messages",
              "Post 3 times about your work on social media",
              "Ask 1 client for a testimonial",
              "Improve 1 process or template",
              "Learn 1 new AI technique or prompt",
              "Review your finances (Are you profitable?)",
              "Talk to 2 potential clients",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </ChapterCard>

        {/* ===== CHAPTER 8 ===== */}
        <ChapterCard id="ch8" icon="IX" label="Chapter 8" title="The 30-60-90 Day Roadmap">
          <p>Here's your exact timeline from £0 to £1,000+/month. Follow it day by day.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Days 1-30: Foundation & First Clients</h3>
          <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Progress</p>
          <ProgressBar pct={33} />
          <div className="space-y-3">
            <Step num="W1" title="Week 1: Setup" desc="Choose business model · Learn AI tools (10 hours) · Create portfolio (3 pieces) · Set up payment infrastructure" />
            <Step num="W2" title="Week 2: Outreach" desc="Build list of 100 clients · Send 50 personalised messages · Follow up · Book 3-5 calls" />
            <Step num="W3" title="Week 3: Close & Deliver" desc="Close first 1-2 clients · Start delivering immediately · Over-deliver by 10% · Ask for testimonials" />
            <Step num="W4" title="Week 4: Refine" desc="Improve based on feedback · Second round of 50 outreach · Close 1-2 more · Document your process" />
          </div>
          <TipBox><strong>TARGET — Day 30:</strong> £500-£800 revenue, 2-4 active clients, testimonials from at least 1 client.</TipBox>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Days 31-60: Scale & Systems</h3>
          <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Progress</p>
          <ProgressBar pct={66} />
          <div className="space-y-3">
            <Step num="W5-6" title="Increase Capacity" desc="Raise prices 25% · Create packages (Bronze/Silver/Gold) · Build templates · Document workflows" />
            <Step num="W7" title="Client Retention" desc="Convert one-offs to retainers · Send monthly reports · Ask for referrals · Continue outreach (20/week)" />
            <Step num="W8" title="Expand" desc="Add 3-5 new clients · Fire worst client · Start posting on social · Consider hiring a VA" />
          </div>
          <TipBox><strong>TARGET — Day 60:</strong> £1,200-£1,800 revenue, 5-8 active clients, at least 2 on retainer.</TipBox>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Days 61-90: Momentum & £1,000+</h3>
          <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Progress</p>
          <ProgressBar pct={100} />
          <div className="space-y-3">
            <Step num="W9-10" title="Solidify" desc="Stabilise retainers · Upsell existing clients · Create a referral program (£50 discount) · Build case studies" />
            <Step num="W11" title="Optimise" desc="Audit all clients · Raise prices again (10-15%) · Better AI workflows · Clearly-priced packages" />
            <Step num="W12" title="Scale" desc="High-value clients only · Say no to small projects · Add a premium tier · Plan for £3,000/month" />
          </div>
          <TipBox><strong>TARGET — Day 90:</strong> £1,500-£2,500 revenue, 6-10 clients, systems in place, clear path to £3k+/month.</TipBox>
        </ChapterCard>

        {/* ===== CONCLUSION ===== */}
        <ChapterCard id="conclusion" icon="X" label="Conclusion" title="You Have Everything You Need">
          <p>Here's what you know now: 9 proven business models · Exact tools and how to use them · Step-by-step processes · How to get paid · Where to find clients · How to close sales · How to deliver quality · How to scale to £3,000+.</p>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">What you DON'T need</h3>
          <div className="space-y-3">
            <Step num="✗" title="More courses." desc="You have everything right here. Stop consuming, start executing." variant="bad" />
            <Step num="✗" title="Better tools." desc="ChatGPT free + Gemini free + Canva free + Lovable free + Google Docs free = enough to make your first £1,000." variant="bad" />
            <Step num="✗" title="Perfect timing." desc="There is no perfect time. Today is the best day to start." variant="bad" />
            <Step num="✗" title="Permission." desc="You don't need anyone to tell you it's OK. You already bought this guide. Go." variant="bad" />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">What you DO need</h3>
          <div className="space-y-3">
            <Step num="✓" title="To start today." desc="Not Monday. Not 'when I'm ready.' Today. Open ChatGPT or Gemini right now." variant="good" />
            <Step num="✓" title="To do the work." desc="Read Chapter 3 again. Follow Day 1. Then Day 2. One step at a time." variant="good" />
            <Step num="✓" title="To not quit." desc="Most people quit in the first 30 days. If you don't quit, you win. It really is that simple." variant="good" />
          </div>

          <p className="text-center text-2xl font-black uppercase text-primary mt-10">
            The only way this doesn't work is if you don't do it.
          </p>
          <p className="text-center text-4xl font-black uppercase text-primary mt-4">
            Go.
          </p>
        </ChapterCard>

        {/* ===== BONUS ===== */}
        <ChapterCard id="bonus" icon="FIN" label="Bonus" title="Resources, Tools & Next Steps">
          <h3 className="text-xl font-black uppercase mb-4">AI Tools — Quick Links</h3>
          <div className="space-y-3">
            <Step num="1" title="ChatGPT Plus — openai.com/chatgpt" desc="Your main AI writing tool. Start free. Upgrade to Plus (£20/month) only once you're getting client work consistently." />
            <Step num="2" title="Google Gemini — gemini.google.com" desc="Google's AI assistant. Excellent for research, coding help, and content generation. Free to use with a Google account." />
            <Step num="3" title="Claude Pro — claude.ai" desc="Alternative to ChatGPT. Some prefer Claude for longer, nuanced content. Free tier available." />
            <Step num="4" title="Lovable — lovable.dev" desc="AI website builder. Describe what you want in plain English, get a fully functional website. The future of web development." />
            <Step num="5" title="Canva — canva.com" desc="Design tool for graphics, social posts, PDFs, and presentations. Free tier is excellent." />
            <Step num="6" title="GitHub Copilot — github.com/features/copilot" desc="AI coding assistant that lives inside VS Code. Auto-completes code, answers questions, and debugs issues." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Payment & Business — Quick Start</h3>
          <div className="space-y-3">
            <Step num="1" title="PayPal — paypal.com" desc="Easiest way to send invoices and get paid. Business account is free." />
            <Step num="2" title="Stripe — stripe.com" desc="Most professional payment processing. Best for recurring invoices." />
            <Step num="3" title="Wise — wise.com" desc="Best for international payments. Low fees. Use for larger invoices." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Portfolio & Scheduling</h3>
          <div className="space-y-3">
            <Step num="1" title="Notion — notion.so (free)" desc="Portfolio hosting, project tracking, client management — all in one." />
            <Step num="2" title="Carrd — carrd.co (£15/year)" desc="Simple one-page website builder. Professional-looking portfolio with zero coding." />
            <Step num="3" title="Buffer — buffer.com (free)" desc="Social media scheduling. Free for up to 3 channels." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Recommended Reading</h3>
          <div className="space-y-3">
            <Step num="1" title='"Cashvertising" by Drew Eric Whitman' desc="The best book on writing copy that sells. Your output quality will double." />
            <Step num="2" title='"Million Dollar Consulting" by Alan Weiss' desc="How to price based on value. Will pay for itself 1000x over." />
            <Step num="3" title="Alex Hormozi's YouTube channel" desc="Free. Arguably better than anything you'd pay for. Watch his videos on offers, pricing, and closing." />
          </div>

          <h3 className="text-xl font-black uppercase mt-8 mb-4 pt-6 border-t-2 border-black/10">Your Next 5 Steps — Do Them Right Now</h3>
          <div className="space-y-3">
            <Step num="1" title="Close this guide" desc="You've read enough. Time to act." />
            <Step num="2" title="Open ChatGPT or Gemini" desc="Go to chat.openai.com or gemini.google.com. Create an account if you haven't. Takes 2 minutes." />
            <Step num="3" title="Pick your model from Chapter 2" desc="Write it down. Say it out loud. That's your business now." />
            <Step num="4" title="Create your first portfolio piece" desc="Use the prompts in this guide. Spend 2 hours. Make it good." />
            <Step num="5" title="Send your first outreach message" desc="Find one business. Write one email. Hit send. You're in business." />
          </div>

          <p className="text-center text-2xl font-black uppercase text-primary mt-10">
            Now go make money.
          </p>

          {/* 1-on-1 Coaching CTA */}
          <div className="bg-primary/5 border-2 border-primary/20 p-6 mt-8 text-center">
            <h4 className="text-xl font-black uppercase mb-2">Want Personalised Coaching?</h4>
            <p className="text-muted-foreground text-sm mb-4">If you'd prefer someone to guide you 1-on-1, we offer personalised coaching sessions. Get hands-on help choosing your model, setting up your tools, and landing your first client.</p>
            <Button
              className="btn-brutal h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-lg gap-2 mx-auto w-full sm:w-auto justify-center"
              onClick={() => setContactOpen(true)}
            >
              <Users className="w-5 h-5" />
              REQUEST 1-ON-1 COACHING
            </Button>
          </div>
        </ChapterCard>

      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <div className="font-black uppercase text-xl">£1000/Mo With AI</div>
          <div className="text-sm">© 2025 All Rights Reserved.</div>
          <div className="flex gap-6 text-sm font-bold uppercase">
            <a href="/terms" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="mailto:admin@mathrix.co.uk" className="hover:text-primary">Support</a>
          </div>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
