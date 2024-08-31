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
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="flex flex-col h-full mt-4 text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-white">About Us</h2>
          <p className="text-base lg:text-lg">
          The Minecraft server project ChickenSky.de is a heart project, the owner "MrChickenFLY" had the desire to create a community SMP for his viewers at the end of 2021, he built a hub at the spawn with command blocks that make it easier for players to get started on the SMP, he quickly liked working with command blocks and started experimenting a lot with them. He quickly had the idea of ​​creating game modes for his community with these command blocks! A team with many enthusiastic people quickly formed around the server, together they started to form the ChickenSky.de server and at the end of 2023 the team started programming plugins and bringing the server up to today's standard!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
