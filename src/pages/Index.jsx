import Benefits from "../features/index/Benefits";
import CallToAction from "../features/index/CallToAction";
import HeroSection from "../features/index/HeroSection";
import Navbar from "../features/index/Navbar";
import ValueProps from "../features/index/ValueProps";
import Footer from "../features/index/Footer";
import Loader from "../ui/Loader";

function Index() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ValueProps />
      <Benefits />
      <CallToAction />
      <Footer />
    </>
  );
}

export default Index;
