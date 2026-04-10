import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Ticker } from '@/components/landing/ticker';
import { LiveDashboard } from '@/components/landing/live-dashboard';
import { Features } from '@/components/landing/features';
import { Stats } from '@/components/landing/stats';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Pricing } from '@/components/landing/pricing';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
// import { CustomCursor } from '@/components/landing/custom-cursor';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { SDKSection } from '@/components/landing/SDKSection';
import { SwarmSection } from '@/components/landing/SwarmSection';

export default function Home() {
  return (
    <>
      {/* <CustomCursor /> */}
      <ScrollReveal />
      <Navbar />
      <Hero />
      <Ticker />
      <LiveDashboard />
      <Features />
      <Stats />
      <SwarmSection />
      <SDKSection />
      {/* <HowItWorks /> */}
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
