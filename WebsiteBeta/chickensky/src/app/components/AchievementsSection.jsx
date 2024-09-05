"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const achievementsList = [
  {
    metric: "Players",
    value: "50",
    prefix: "",
    postfix: "",
  },
  {
    metric: "Discord Member",
    value: "124",
    prefix: "",
    postfix: "",
  },
  {
    metric: "Team Member",
    value: "13",
    prefix: "",
    postfix: "",
  },
  {
    metric: "Minigames",
    value: "3",
    prefix: "",
    postfix: "",
  },
];

// Status-Konstante
const MAINTENANCE_MODE = false; // Ändere dies auf `true`, um in den Wartungsmodus zu wechseln

// Funktion, um den aktuellen Playercount von der API abzurufen
const fetchPlayerCount = async () => {
  try {
    const response = await fetch('https://api.mcsrvstat.us/2/chickensky.de');
    const data = await response.json();
    return data.players.online;
  } catch (error) {
    console.error("Fehler beim Abrufen des Playercounts:", error);
    return 0;
  }
};

// Funktion, um die Discord-Mitgliederanzahl von der eigenen API abzurufen
const fetchDiscordMemberCount = async () => {
  try {
    const response = await fetch('/api/memberCount');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Fehler beim Abrufen der Mitgliederanzahl');
    }

    return data.memberCount;
  } catch (error) {
    console.error('Fehler beim Abrufen des Discord Member Counts:', error);
    return 0;
  }
};

// Funktion, um den Server-Status abzurufen
const fetchServerStatus = async () => {
  if (MAINTENANCE_MODE) {
    return 'maintenance';
  }
  try {
    const response = await fetch('https://api.mcsrvstat.us/2/chickensky.de');
    const data = await response.json();
    return data.online ? 'online' : 'offline';
  } catch (error) {
    console.error("Fehler beim Abrufen des Serverstatus:", error);
    return 'offline';
  }
};

const AchievementsSection = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [discordMemberCount, setDiscordMemberCount] = useState(0);
  const [serverStatus, setServerStatus] = useState('maintenance');

  useEffect(() => {
    const updatePlayerCount = async () => {
      const count = await fetchPlayerCount();
      setPlayerCount(count);
    };

    const updateDiscordMemberCount = async () => {
      const count = await fetchDiscordMemberCount();
      setDiscordMemberCount(count);
    };

    const updateServerStatus = async () => {
      const status = await fetchServerStatus();
      setServerStatus(status);
    };

    // Initiale Abfragen
    updatePlayerCount();
    updateDiscordMemberCount();
    updateServerStatus();

  }, []); // Dependency-Array leer lassen, damit es nur einmal beim Laden ausgeführt wird

  // Bestimme die Farbe des Statuspunkts
  const statusColor = serverStatus === 'online' ? 'bg-green-500' :
                      serverStatus === 'offline' ? 'bg-red-500' :
                      'bg-orange-500';

  return (
    <div className="px-4 py-8 xl:gap-16 sm:py-16 xl:px-16">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${statusColor}`} />
          <p className="text-lg font-bold text-white">
            {serverStatus === 'online' ? 'Server Online' :
             serverStatus === 'offline' ? 'Server Offline' :
             'Wartungen'}
          </p>
        </div>
      </div>
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          if (achievement.metric === "Players") {
            return (
              <div
                key={`players-${playerCount}`}
                className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
              >
                <h2 className="flex flex-row text-4xl font-bold text-white">
                  {achievement.prefix}
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={parseInt(playerCount)}
                    locale="en-US"
                    className="text-4xl font-bold text-white"
                    configs={(_, index) => ({
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    })}
                  />
                  {achievement.postfix}
                </h2>
                <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
              </div>
            );
          }

          if (achievement.metric === "Discord Member") {
            return (
              <div
                key={`discord-member-${discordMemberCount}`}
                className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
              >
                <h2 className="flex flex-row text-4xl font-bold text-white">
                  {achievement.prefix}
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={parseInt(discordMemberCount)}
                    locale="en-US"
                    className="text-4xl font-bold text-white"
                    configs={(_, index) => ({
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    })}
                  />
                  {achievement.postfix}
                </h2>
                <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="flex flex-row text-4xl font-bold text-white">
                {achievement.prefix}
                {achievement.value}
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
