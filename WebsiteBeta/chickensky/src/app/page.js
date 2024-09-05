import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import Shop from "./components/shop";
import InteractiveBoxes from "./components/minigames";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container px-12 py-4 mx-auto mt-24">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <InteractiveBoxes />
        <Shop />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
