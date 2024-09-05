// pages/index.jsx
"use client"; 
import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import Shop from "./components/Shop";
import InteractiveBoxes from "./components/minigames";
import MaintenanceOverlay from "./components/MaintenanceOverlay"; // Importiere die Wartungs-Overlay-Komponente

export default function Home() {
  // Zustand, um die Anzeige des Wartungs-Overlays zu kontrollieren
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false); // Setze auf `true`, um die Meldung anzuzeigen

  useEffect(() => {
    if (isMaintenanceActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Aufräumen: Entfernen der Klasse, wenn die Komponente unmontiert wird oder sich der Zustand ändert
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMaintenanceActive]);

  return (
    <main className="relative flex min-h-screen flex-col bg-[#121212]">
      {/* Wartungs-Overlay */}
      <MaintenanceOverlay isActive={isMaintenanceActive} />

      {/* Hauptinhalt der Seite */}
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
