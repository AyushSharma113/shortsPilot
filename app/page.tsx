import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Bot, 
  CalendarClock, 
  CheckCircle, 
  Clapperboard, 
  Instagram, 
  LayoutDashboard, 
  Play, 
  Sparkles, 
  Youtube, 
  Mail,
  Twitter,
  Github
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>ShortsPilot</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">
              Log in
            </Link>
            <Button size="sm" className="rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Now with AI Voice Cloning
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Your AI Short Video <br />
              <span className="text-primary">Empire Pilot</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 md:text-xl leading-relaxed">
              Generate usage-ready viral shorts from text prompts. Auto-schedule directly to YouTube Shorts, Instagram Reels, and TikTok.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Button size="lg" className="h-12 px-8 rounded-full text-base">
                Start Generating Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Watch Demo
              </Button>
            </div>

            {/* Dashboard Preview Mockup */}
            <div className="mx-auto max-w-5xl rounded-xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-sm p-2 md:p-4">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted/30">
                <div className="absolute inset-x-0 top-0 h-10 border-b border-border bg-card/50 flex items-center px-4 gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                {/* Mockup Content */}
                <div className="absolute inset-0 top-10 flex">
                  {/* Sidebar Mockup */}
                  <div className="w-16 md:w-64 border-r border-border bg-card/30 p-4 hidden md:flex flex-col gap-4">
                     <div className="h-8 w-3/4 rounded bg-muted"></div>
                     <div className="space-y-2 mt-4">
                        <div className="h-8 w-full rounded bg-primary/10"></div>
                        <div className="h-8 w-full rounded bg-muted/50"></div>
                        <div className="h-8 w-full rounded bg-muted/50"></div>
                     </div>
                  </div>
                  {/* Main Area Mockup */}
                  <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div className="h-32 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 flex items-center justify-center">
                            <span className="text-primary/40 font-medium">Video Generator Area</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-24 rounded-lg bg-muted/30"></div>
                            <div className="h-24 rounded-lg bg-muted/30"></div>
                            <div className="h-24 rounded-lg bg-muted/30"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-full rounded-xl bg-muted/20 border border-border p-4">
                            <div className="h-4 w-1/2 bg-muted mb-4 rounded"></div>
                            <div className="space-y-2">
                                <div className="h-10 w-full bg-background rounded border border-border/50"></div>
                                <div className="h-10 w-full bg-background rounded border border-border/50"></div>
                                <div className="h-10 w-full bg-background rounded border border-border/50"></div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-border/50 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Trusted by creators publishing to</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2 font-bold text-xl"><Youtube className="h-6 w-6 text-red-600" /> YouTube Shorts</div>
               <div className="flex items-center gap-2 font-bold text-xl"><Instagram className="h-6 w-6 text-pink-600" /> Instagram Reels</div>
               <div className="flex items-center gap-2 font-bold text-xl"><span className="font-black text-2xl">TikTok</span></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need to go viral</h2>
              <p className="text-lg text-muted-foreground">Stop manually editing and posting. ShortsPilot handles the entire workflow from idea to specific upload time.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-all hover:border-primary/50">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Bot className="h-24 w-24" />
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Content Generator</h3>
                <p className="text-muted-foreground">Just provide a topic or URL. Our AI writes the script, selects stock footage, adds voiceovers, and generates captions automatically.</p>
              </div>

              {/* Feature 2 */}
              <div className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-all hover:border-primary/50">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CalendarClock className="h-24 w-24" />
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <CalendarClock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Auto-Scheduler</h3>
                <p className="text-muted-foreground">Connect your accounts once. Schedule months of content in minutes. We post for you at the optimal times for engagement.</p>
              </div>

               {/* Feature 3 */}
               <div className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-all hover:border-primary/50">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <LayoutDashboard className="h-24 w-24" />
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multi-Platform Sync</h3>
                <p className="text-muted-foreground">One short, every platform. Automatically resize and reformat your video to fit YouTube, TikTok, and Instagram specs perfectly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Preview / Demo Section */}
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                            Create professional videos <br/>
                            <span className="text-primary">without opening an editor</span>
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <span className="font-semibold block">Human-like Voiceovers</span>
                                    <span className="text-muted-foreground">Choose from 100+ premium AI voices or clone your own.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <span className="font-semibold block">Dynamic Captions</span>
                                    <span className="text-muted-foreground">Engagement-boosting styles like Hormozi, Beast, and Simple.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <span className="font-semibold block">Copyright-Free Assets</span>
                                    <span className="text-muted-foreground">Access millions of stock videos and music tracks automatically.</span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8">
                            <Button size="lg" className="rounded-full">Create Your First Video</Button>
                        </div>
                    </div>
                    <div className="relative mx-auto w-[280px] h-[580px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden">
                        {/* Phone Screen Mockup */}
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 flex flex-col justify-end p-6">
                                    <div className="space-y-2 mb-12">
                                        <div className="h-4 w-3/4 bg-white/80 rounded animate-pulse"></div>
                                        <div className="h-4 w-1/2 bg-white/60 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between items-center text-white">
                                        <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-full bg-white/20"></div></div>
                                        <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-full bg-white/20"></div></div>
                                        <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-full bg-white/20"></div></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                     <Clapperboard className="w-16 h-16 text-white/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 -z-10"></div>
             <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to skyrocket your reach?</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join 10,000+ creators using ShortsPilot to dominate the algorithm.</p>
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg shadow-primary/25">
                    Get Started for Free
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">No credit card required. Cancel anytime.</p>
             </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                <div className="col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-2 font-bold text-xl mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <span>ShortsPilot</span>
                    </div>
                    <p className="text-muted-foreground mb-6 max-w-xs">
                        The all-in-one AI platform for short-form video creation and scheduling. Built for creators, by creators.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Youtube className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5" /></Link>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold mb-4">Product</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Roadmap</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Showcase</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Resources</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Community</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">API Deps</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} ShortsPilot Inc. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
