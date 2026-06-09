import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import LiveLeadFeed from "@/components/home/LiveLeadFeed";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Trust from "@/components/home/Trust";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveLeadFeed />
        <Services />
        <HowItWorks />
        <Pricing />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
