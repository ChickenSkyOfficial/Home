import React from 'react';

const ProductCard = ({ name, description, price, imageUrl, productUrl }) => {
  return (
    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md flex flex-col items-center text-center">
      <img 
        src={imageUrl} 
        alt={name} 
        className="object-cover w-full h-40 mb-4 rounded-md" 
      />
      <h2 className="mb-2 text-xl font-semibold text-green-400">{name}</h2>
      <p className="mb-4 text-gray-300">{description}</p>
      <p className="text-lg font-bold text-white">{price}</p>
      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          onClick={() => window.open(productUrl, '_blank')}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
