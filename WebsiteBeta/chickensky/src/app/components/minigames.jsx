'use client'; // Diese Zeile markiert die Datei als Client-Komponente

import React, { useState } from 'react';

// Definiere die Box-Daten hier
const boxData = [
  { id: 1, name: 'Box 1', image: 'https://i.postimg.cc/W4wjZXgs/Design-ohne-Titel-7.png', clickText: 'Bed Wars FFA ist ein Multiplayer-Spiel, in dem jeder gegen jeden kämpft. Spieler versuchen, die Betten ihrer Gegner zu zerstören, um deren Respawn zu verhindern. Ziel ist es, als letzter Überlebender übrig zu bleiben.' },
  { id: 2, name: 'Box 2', image: '/images/image2.jpg', clickText: 'Box 2 wurde geklickt!' },
  { id: 3, name: 'Box 3', image: '/images/image3.jpg', clickText: 'Box 3 wurde geklickt!' },
];

const InteractiveBoxes = () => {
  const [clickedBox, setClickedBox] = useState(null);

  const handleBoxClick = (boxId) => {
    setClickedBox(clickedBox === boxId ? null : boxId);
  };

  return (
    <div className="py-8 text-center">
      <h1 className="mb-6 text-4xl font-bold text-white">Minigames</h1>
      <p className="mb-12 text-lg text-gray-300">
        Discover the best interactive mini-games.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {boxData.map((box) => (
          <div
            key={box.id}
            className="relative w-60 h-[340px] cursor-pointer rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleBoxClick(box.id)}
          >
            <img
              src={box.image}
              alt={box.name}
              className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${
                clickedBox === box.id ? 'blur-sm' : ''
              }`}
            />
            <div className={`absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center transition-transform duration-300 ease-in-out ${
              clickedBox === box.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <p
                className={`text-white text-center font-bold transition-transform duration-500 ease-in-out ${
                  clickedBox === box.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                {clickedBox === box.id ? box.clickText : box.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveBoxes;
