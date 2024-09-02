"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => import("react-animated-numbers"),
  { ssr: false   
 }
);

const achievementsList = [
  {
    metric:   
 "Players",
    value: "50", // Initialer Wert, wird durch den State ersetzt
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

// Funktion, um den aktuellen Playercount und Serverstatus von der API abzurufen
const fetchServerStatus = async () => {
  try {
    const response = await fetch('https://api.mcsrvstat.us/2/chickensky.de');
    const data = await response.json();
    return {
      playerCount: data.players.online,
      online: data.online,
    };
  } catch (error) {
    console.error("Fehler beim Abrufen des Serverstatus:", error);
    return {
      playerCount: 0,
      online: false,
    };
  }
};

const AchievementsSection = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const updateServerStatus = async () => {
      const { playerCount, online } = await fetchServerStatus();
      setPlayerCount(playerCount);
      setIsOnline(online);
    };

    // Initiale Abfrage
    updateServerStatus();

    // Alle 5 Sekunden aktualisieren
    const interval = setInterval(updateServerStatus, 5000);

    // Aufräumen, wenn die Komponente unmontiert wird
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-8 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center   
 justify-between">   

        {/* Status Box */}
        <div className="flex items-center mb-4 sm:mb-0 sm:w-1/4">
          <div
            className={`flex items-center ${isOnline ? "text-green-500" : "text-red-500"}`}
          >
            <div
              className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
              style={{ marginRight: 0 }} // Remove margin for spacing adjustment
            />
            <span className="ml-2 text-lg font-bold">  {/* Added marginLeft for spacing */}
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
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
