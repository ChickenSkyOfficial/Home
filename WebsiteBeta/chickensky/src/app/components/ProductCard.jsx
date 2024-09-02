// components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ name, description, price, imageUrl }) => {
  return (
    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
      <img 
        src={imageUrl} 
        alt={name} 
        className="object-cover w-full h-40 mb-4 rounded-md" 
      />
      <h2 className="mb-2 text-xl font-semibold text-green-400">{name}</h2>
      <p className="mb-4 text-gray-300">{description}</p>
      <p className="text-lg font-bold text-white">{price}</p>
    </div>
  );
};

export default ProductCard;
