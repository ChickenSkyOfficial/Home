// components/MaintenanceOverlay.jsx
import React from 'react';

const MaintenanceOverlay = ({ isActive }) => {
  if (!isActive) return null; // Wenn die Wartung nicht aktiv ist, wird nichts gerendert.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="text-center p-8 bg-[#121212] border border-gray-600 rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-white">Webserver in Wartung</h1>
        <p className="text-lg text-gray-300">Unsere Seite ist momentan in Wartung. Bitte versuchen Sie es später erneut.</p>
      </div>
    </div>
  );
};

export default MaintenanceOverlay;
