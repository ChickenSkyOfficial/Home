"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const achievementsList = [
  {
    metric: "Players",
    value: "50", // Initialer Wert, wird durch den State ersetzt
    prefix: "",
    postfix: "",
  },
  {
    metric: "Discord Member",
    value: "124", // Initialer Wert, wird durch den State ersetzt
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

// Funktion, um den aktuellen Playercount von der API abzurufen
const fetchPlayerCount = async () => {
  try {
    const response = await fetch('https://api.mcsrvstat.us/2/chickensky.de');
    const data = await response.json();
    return data.players.online; // Gibt die aktuelle Anzahl der Spieler zurück
  } catch (error) {
    console.error("Fehler beim Abrufen des Playercounts:", error);
    return 0;
  }
};

// Funktion, um die Discord-Mitgliederanzahl von der eigenen API abzurufen
const fetchDiscordMemberCount = async () => {
  try {
    const response = await fetch('/api/memberCount'); // Anfrage an die eigene API-Route
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

const AchievementsSection = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [discordMemberCount, setDiscordMemberCount] = useState(0);

  useEffect(() => {
    const updatePlayerCount = async () => {
      const count = await fetchPlayerCount();
      setPlayerCount(count);
    };

    const updateDiscordMemberCount = async () => {
      const count = await fetchDiscordMemberCount();
      setDiscordMemberCount(count);
    };

    // Initiale Abfragen
    updatePlayerCount();
    updateDiscordMemberCount();

    // Aktualisiere alle 5 Sekunden
    const interval = setInterval(() => {
      updatePlayerCount();
      updateDiscordMemberCount();
    }, 5000);

    // Aufräumen, wenn die Komponente unmontiert wird
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-8 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          // Wenn das Achievement "Players" ist, den aktuellen Playercount anzeigen
          if (achievement.metric === "Players") {
            return (
              <div
                key={`players-${playerCount}`} // Dynamischer Key für AnimatedNumbers
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

          // Wenn das Achievement "Discord Member" ist, den aktuellen Discord Member Count anzeigen
          if (achievement.metric === "Discord Member") {
            return (
              <div
                key={`discord-member-${discordMemberCount}`} // Dynamischer Key für AnimatedNumbers
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

          // Andere Achievements
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
