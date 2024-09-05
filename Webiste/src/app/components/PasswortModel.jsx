"use client";

import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Importieren des Schließen-Icons von Heroicons

const PasswordModal = ({ isVisible, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const correctPassword = 'yourpassword'; // Ändere dies in dein tatsächliches Passwort

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onSuccess();
      onClose();
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 ${isVisible ? 'block' : 'hidden'}`}
    >
      <div className="relative p-6 bg-[#121212] rounded shadow-lg w-80">
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-500 top-2 right-2 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="mb-4 text-2xl">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
