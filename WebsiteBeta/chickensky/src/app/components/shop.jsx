"use client"; // Markiert die Datei als Client-Komponente

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import PasswordModal from './PasswortModel';

const Shop = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);

  const handlePasswordSuccess = () => {
    setPasswordVerified(true);
    setShowPasswordModal(false);
  };

  return (
    <div id="store" className="relative min-h-screen bg-[#121212] text-white">
      {showPasswordModal && (
        <PasswordModal
          isVisible={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}
      {!passwordVerified ? (
        <div className="flex items-center justify-center min-h-screen">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Enter Store
          </button>
        </div>
      ) : (
        <div className="pt-16"> {/* Abstand oben, damit es nach dem Modal angezeigt wird */}
          <header className="py-8 text-center">
            <h1 className="mb-6 text-4xl font-bold text-white">Store</h1>
            <p className="mb-12 text-lg text-gray-300">
              Discover the best products tailored to your needs.
            </p>
          </header>
          <main className="max-w-4xl py-10 mx-auto">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ProductCard 
                name="Mini Pack" 
                description="100 C Bucks" 
                price="2,99€" 
                imageUrl="https://i.postimg.cc/63L1pPsN/Design-ohne-Titel-5.png" 
                productUrl="https://buy.stripe.com/test_fZebM52QWbSz2yI7sw" // Ersetze dies mit der tatsächlichen URL
              />
              <ProductCard 
                name="Medium Pack" 
                description="500 C Bucks" 
                price="12,99€" 
                imageUrl="https://i.postimg.cc/t43RpXrS/Design-ohne-Titel-3.png" 
                productUrl="https://buy.stripe.com/test_fZedUdajof4L3CM28d" // Ersetze dies mit der tatsächlichen URL
              />
              <ProductCard 
                name="Large Pack" 
                description="1000 C Bucks" 
                price="23,99€" 
                imageUrl="https://i.postimg.cc/GmxBzJ1m/Design-ohne-Titel-4.png" 
                productUrl="https://buy.stripe.com/test_3cs17r77c9Kr0qA6ou" // Ersetze dies mit der tatsächlichen URL
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Shop;
