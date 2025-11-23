
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { StockTicker } from "@/components/StockTicker";
import { Hero3D } from "@/components/Hero3D";
import { AnimatedStats } from "@/components/AnimatedStats";
import { PageLoader } from "@/components/PageLoader";
import { ScrollStepper } from "@/components/ScrollStepper";

export default function Home() {
  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden relative">
        {/* Noise Texture Overlay - Moved to z-0 to sit behind content */}
        <div className="fixed inset-0 w-full h-full bg-noise z-0 pointer-events-none mix-blend-multiply opacity-50"></div>

        {/* Animated Background - Sits at -z-10 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

          {/* Floating Elements */}
          <div className="absolute top-1/3 left-10 w-16 h-16 border-4 border-black/5 rounded-full animate-bounce duration-[3000ms]"></div>
          <div className="absolute bottom-1/4 right-10 w-24 h-24 border-4 border-black/5 rounded-lg rotate-12 animate-pulse duration-[4000ms]"></div>
        </div>

        {/* Navigation - z-50 to stay on top */}
        <nav className="fixed top-0 w-full z-50 border-b border-black/5 bg-white/70 backdrop-blur-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tighter">KR4</div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-black/60">
              <Link href="#" className="hover:text-black transition-colors">Markets</Link>
              <Link href="#" className="hover:text-black transition-colors">Governance</Link>
              <Link href="#" className="hover:text-black transition-colors">Developers</Link>
            </div>
            <Link
              href="https://dclex-dex.netlify.app/"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Launch App
            </Link>
          </div>
          <StockTicker />
        </nav>

        <main className="relative z-10">
          {/* Hero Section - Full Screen */}
          <section className="relative min-h-screen flex items-center justify-center px-6 border-b border-black/5">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20">
              <div className="flex flex-col justify-center">
                <FadeIn delay={0.2} direction="up">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 lg:mb-8">
                    <span className="text-gradient">Tokenized Stocks</span> <br />
                    <span className="text-black/40">on Lisk.</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.4} direction="up">
                  <p className="text-lg md:text-xl lg:text-2xl text-black/60 max-w-2xl mb-8 lg:mb-12 leading-relaxed">
                    Buy global stocks with <strong>IDRX</strong>. Low fees, instant settlement, and secured on the Lisk blockchain.
                  </p>
                </FadeIn>
                <FadeIn delay={0.6} direction="up">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="https://dclex-dex.netlify.app/"
                      className="px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-black/20"
                    >
                      Start Trading
                    </Link>
                    <Link
                      href="#"
                      className="px-8 py-4 border border-black/20 text-black text-lg font-medium rounded-full hover:bg-black/5 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center backdrop-blur-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Hero 3D Asset */}
              <FadeIn delay={0.8} direction="up" scale={0.85}>
                <Hero3D />
              </FadeIn>
            </div>
          </section>

          {/* Animated Stats */}
          <AnimatedStats />

          {/* Features Grid */}
          <section className="py-24 px-6 border-b border-black/5 bg-dot-grid relative">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 relative z-10">
              <FadeIn delay={0.2} className="h-full">
                <div className="group h-full p-8 rounded-3xl glass-card hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">Buy with IDRX</h3>
                  <p className="text-black/50 mb-6 leading-relaxed">
                    Seamlessly swap between IDRX stablecoin and tokenized stocks. No traditional broker account needed.
                  </p>
                  <Link href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                    Start Trading <span>→</span>
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.4} className="h-full">
                <div className="group h-full p-8 rounded-3xl glass-card hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">Earn Yield on Stocks</h3>
                  <p className="text-black/50 mb-6 leading-relaxed">
                    Add your stocks to liquidity pools on Lisk and earn a share of fees on every swap.
                  </p>
                  <Link href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                    Explore Pools <span>→</span>
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.6} className="h-full">
                <div className="group h-full p-8 rounded-3xl glass-card hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">Track on Lisk</h3>
                  <p className="text-black/50 mb-6 leading-relaxed">
                    Manage your stock portfolio on-chain with full self-custody. Verify every transaction on the Lisk explorer.
                  </p>
                  <Link href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                    View Portfolio <span>→</span>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-32 px-6 border-b border-black/5 relative overflow-hidden">
            {/* Grid Lines Background (Blueprint Style) */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.5) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">How It Works</h2>
                <p className="text-xl text-black/60 max-w-2xl">
                  Get started with tokenized stocks in four simple steps.
                </p>
              </div>
              <ScrollStepper
                steps={[
                  {
                    title: "Connect Your Wallet",
                    description: "Link your Web3 wallet to the KR4 platform. We support MetaMask, WalletConnect, and other popular Lisk-compatible wallets.",
                  },
                  {
                    title: "Deposit IDRX Stablecoin",
                    description: "Fund your account with IDRX, our native stablecoin pegged to Indonesian Rupiah. Swap from other tokens or deposit directly.",
                  },
                  {
                    title: "Browse & Buy Stocks",
                    description: "Explore global stocks tokenized on Lisk. Buy fractional shares with IDRX instantly, no traditional broker needed.",
                  },
                  {
                    title: "Earn & Trade",
                    description: "Hold your stocks, add them to liquidity pools to earn yield, or trade them 24/7 on our decentralized exchange.",
                  },
                ]}
              />
            </div>
          </section>

          {/* Compliance Section */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <FadeIn delay={0.2}>
                <div className="mb-16">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Compliant and Secure</h2>
                  <p className="text-xl text-black/60 max-w-2xl">
                    Built with institutional-grade security and full regulatory compliance in mind.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-3 gap-8 border-t border-black/10 pt-12">
                <FadeIn delay={0.3}>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Licensed & Regulated</h4>
                    <p className="text-black/50 text-sm">
                      All securities offered by and through our SEC Registered Broker-Dealer partners.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Institutional Reliability</h4>
                    <p className="text-black/50 text-sm">
                      Delivering institutional-grade custody, liquidity, and security standards for all assets.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">100% Asset Reserves</h4>
                    <p className="text-black/50 text-sm">
                      Tokens are 100% backed by verifiable, independently audited real-world asset reserves.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-black/10 bg-white/50 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-black/40">
              © 2024 KR4. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-black/40">
              <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-black transition-colors">Terms</Link>
              <Link href="#" className="hover:text-black transition-colors">Twitter</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
