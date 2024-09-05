"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="items-center gap-8 px-4 py-8 md:grid md:grid-cols-2 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} alt="About Image" />
        <div className="flex flex-col h-full mt-4 text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-white">About Us</h2>
          <p className="text-base lg:text-lg">
            The Minecraft server project <strong>ChickenSky.de</strong> is a heart project. The owner <strong>MrChickenFLY</strong> had the desire to create a community SMP for himself and his viewers at the end of 2021. What started as a normal Survival Multiplayer, quickly began forming into a minigames server like no other. With an <strong>amazing</strong> team and very much <strong>passion</strong>, the <strong>Chickensky</strong> network is growing day by day. We&apos;re very happy to have <strong>you</strong> on this incredible journey with us!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
