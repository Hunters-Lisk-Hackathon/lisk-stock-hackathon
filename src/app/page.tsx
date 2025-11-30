import Link from "next/link";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/FadeIn";
import { StockTicker } from "@/components/StockTicker";
import { Hero3D } from "@/components/Hero3D";
import { PageLoader } from "@/components/PageLoader";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CursorFollower } from "@/components/CursorFollower";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MobileMenu } from "@/components/MobileMenu";
import { BackToTop } from "@/components/BackToTop";
import { WalletButton } from "@/components/WalletButton";

const AnimatedStats = dynamic(
  () =>
    import("@/components/AnimatedStats").then((mod) => ({
      default: mod.AnimatedStats,
    })),
  {
    loading: () => <div className="w-full h-32" />,
    ssr: true,
  },
);

const ScrollStepper = dynamic(
  () =>
    import("@/components/ScrollStepper").then((mod) => ({
      default: mod.ScrollStepper,
    })),
  {
    loading: () => <div className="w-full h-96" />,
    ssr: true,
  },
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <PageLoader />
      <BackToTop />
      <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden relative bg-dot-grid">
        <div className="fixed inset-0 w-full h-full bg-noise z-0 pointer-events-none mix-blend-multiply opacity-50"></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-zinc-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

          <div className="absolute top-1/3 left-10 w-16 h-16 border-4 border-black/5 rounded-full animate-bounce duration-[3000ms]"></div>
          <div className="absolute bottom-1/4 right-10 w-24 h-24 border-4 border-black/5 rounded-lg rotate-12 animate-pulse duration-[4000ms]"></div>
        </div>

        <nav className="fixed top-0 w-full z-50 border-b border-black/5 bg-white/70 backdrop-blur-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="relative w-32 h-10">
              <NextImage
                src="/images/stako-logo-transparent.png"
                alt="Stako Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-black/60">
              <Link
                href="#markets"
                className="hover:text-black transition-colors"
              >
                Markets
              </Link>
              <Link
                href="#governance"
                className="hover:text-black transition-colors"
              >
                Governance
              </Link>
              <Link
                href="#developers"
                className="hover:text-black transition-colors"
              >
                Developers
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <WalletButton />
              <MobileMenu />
            </div>
          </div>
          <StockTicker />
        </nav>

        <main className="relative z-10">
          <section className="relative min-h-screen flex items-center justify-center px-6 border-b border-black/5 pt-24 md:pt-28">
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.8) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                maskImage:
                  "linear-gradient(to bottom, black 40%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 40%, transparent 100%)",
              }}
            />

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 lg:gap-16 items-center py-12 md:py-20 relative z-10">
              <div className="flex flex-col justify-center">
                <FadeIn delay={0.2} direction="up">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 lg:mb-8 leading-[1.1]">
                    <span className="text-gradient">Tokenized Stocks</span>{" "}
                    <br />
                    <span className="text-black/40 tracking-tighter">
                      for Everyone.
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.4} direction="up">
                  <p className="text-base md:text-lg lg:text-xl text-black/60 max-w-2xl mb-6 md:mb-8 lg:mb-12 leading-relaxed">
                    Buy global stocks with{" "}
                    <strong className="text-black">IDRX</strong>. Low fees,
                    instant settlement, and secured on the{" "}
                    <strong className="text-black">Lisk L2</strong> blockchain.
                  </p>
                </FadeIn>
                <FadeIn delay={0.6} direction="up">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/dashboard"
                      className="btn-glow px-6 md:px-8 py-3 md:py-4 bg-black text-white text-base md:text-lg font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-black/30 tracking-wide"
                    >
                      Start Trading
                    </Link>
                    <Link
                      href="#developers"
                      className="px-6 md:px-8 py-3 md:py-4 border border-black/20 text-black text-base md:text-lg font-medium rounded-full hover:bg-black/5 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center backdrop-blur-sm tracking-wide"
                    >
                      Learn More
                    </Link>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.8} direction="up" scale={0.85}>
                <div className="parallax-globe">
                  <Hero3D />
                </div>
              </FadeIn>
            </div>
          </section>

          <AnimatedStats />

          <section
            id="markets"
            className="py-12 md:py-24 px-4 md:px-6 border-b border-black/5 relative scroll-mt-20"
          >
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-12 relative z-10">
              <FadeIn delay={0.1} className="h-full">
                <SpotlightCard className="h-full p-8 group">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">
                    Buy with IDRX
                  </h3>
                  <p className="text-black/50 mb-6 leading-relaxed">
                    Seamlessly swap between IDRX stablecoin and tokenized
                    stocks. No traditional broker account needed.
                  </p>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors inline-flex items-center gap-1 group-hover:gap-2"
                  >
                    Start Trading <span>→</span>
                  </Link>
                </SpotlightCard>
              </FadeIn>
              <FadeIn delay={0.2} className="h-full">
                <SpotlightCard className="h-full p-8 group">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">
                    Fractional Ownership
                  </h3>
                  <p className="text-black/50 mb-6 leading-relaxed">
                    Own a piece of your favorite companies. Buy fractional shares
                    starting from just $1 worth of IDRX.
                  </p>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors inline-flex items-center gap-1 group-hover:gap-2"
                  >
                    Start Investing <span>→</span>
                  </Link>
                </SpotlightCard>
              </FadeIn>
              <FadeIn delay={0.3} className="h-full">
                <SpotlightCard className="h-full p-8 group">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-black/80 transition-colors">
                    Self-Custody & Track
                  </h3>
                  <p className="text-black/50 mb-6 leading-relaxed">
                    Manage your stock portfolio on-chain with full self-custody.
                    Verify every transaction on the Lisk explorer.
                  </p>
                  <Link
                    href="#"
                    className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors inline-flex items-center gap-1 group-hover:gap-2"
                  >
                    View Portfolio <span>→</span>
                  </Link>
                </SpotlightCard>
              </FadeIn>
            </div>
          </section>

          <section
            id="developers"
            className="py-16 md:py-32 px-4 md:px-6 border-b border-black/5 relative scroll-mt-20"
          >
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 md:mb-6">
                  How It Works
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-black/60 max-w-2xl">
                  Get started with tokenized stocks in four simple steps.
                </p>
              </div>
              <ScrollStepper
                steps={[
                  {
                    title: "Connect Your Wallet",
                    description:
                      "Link your Web3 wallet to the Stako platform. We support MetaMask, WalletConnect, and other popular Lisk-compatible wallets.",
                  },
                  {
                    title: "Deposit IDRX Stablecoin",
                    description:
                      "Fund your account with IDRX, our native stablecoin pegged to Indonesian Rupiah. Swap from other tokens or deposit directly.",
                  },
                  {
                    title: "Browse & Buy Stocks",
                    description:
                      "Explore global stocks tokenized on Lisk. Buy fractional shares with IDRX instantly, no traditional broker needed.",
                  },
                  {
                    title: "Trade 24/7",
                    description:
                      "Trade your tokenized stocks anytime, anywhere. Enjoy instant settlement and full control over your assets.",
                  },
                ]}
              />
            </div>
          </section>

          <section
            id="governance"
            className="py-12 md:py-24 px-4 md:px-6 scroll-mt-20"
          >
            <div className="max-w-7xl mx-auto">
              <FadeIn delay={0.2}>
                <div className="mb-8 md:mb-16">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 md:mb-6">
                    Compliant and Secure
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-black/60 max-w-2xl">
                    Built with institutional-grade security and full regulatory
                    compliance in mind.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8 border-t border-black/10 pt-8 md:pt-12">
                <FadeIn delay={0.3}>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Licensed & Regulated
                    </h4>
                    <p className="text-black/50 text-sm">
                      All securities offered by and through our SEC Registered
                      Broker-Dealer partners.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Institutional Reliability
                    </h4>
                    <p className="text-black/50 text-sm">
                      Delivering institutional-grade custody, liquidity, and
                      security standards for all assets.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      100% Asset Reserves
                    </h4>
                    <p className="text-black/50 text-sm">
                      Tokens are 100% backed by verifiable, independently
                      audited real-world asset reserves.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-black/10 bg-white/50 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-xs md:text-sm text-black/40">
              © 2025 Stako. All rights reserved.
            </div>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-black/40">
              <Link href="#" className="hover:text-black transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Twitter
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
