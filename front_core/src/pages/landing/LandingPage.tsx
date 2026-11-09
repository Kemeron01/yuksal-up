import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Benefits } from './sections/Benefits';
import { CtaBanner } from './sections/CtaBanner';
import { Directions } from './sections/Directions';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Overview } from './sections/Overview';

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Benefits />
        <HowItWorks />
        <CtaBanner />
        <Directions />
      </main>
      <Footer />
    </>
  );
}
