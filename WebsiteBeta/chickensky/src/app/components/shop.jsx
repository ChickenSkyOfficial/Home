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
            Enter Shop
          </button>
        </div>
      ) : (
        <div className="pt-16"> {/* Abstand oben, damit es nach dem Modal angezeigt wird */}
          <header className="py-8 text-center">
            <h1 className="mb-6 text-4xl font-bold text-white">Store</h1>
            <p className="mb-12 text-lg text-gray-300">
              Get Cool Cosmetics and Accessories
            </p>
          </header>
          <main className="max-w-4xl py-10 mx-auto">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ProductCard 
                name="C Bucks" 
                description="100 C Bucks" 
                price="2,99€" 
                imageUrl="https://i.postimg.cc/0Q6j7fh3/3.png" 
              />
              <ProductCard 
                name="Product 2" 
                description="Another great product" 
                price="$30" 
                imageUrl="https://placehold.jp/0011ff/ffffff/150x150.png" 
              />
              <ProductCard 
                name="Product 3" 
                description="You will love this" 
                price="$40" 
                imageUrl="https://placehold.jp/0011ff/ffffff/150x150.png" 
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Shop;
