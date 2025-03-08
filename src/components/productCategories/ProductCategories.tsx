"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const ProductCategories = () => {
  const products = [
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'Featured now 1',
      description: 'AEROHAVEN Set Of 5 Multi Colored Decorative Hand Made Jute...',
      price: '₹220.00',
      originalPrice: '₹999.00'
    },
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'Featured now 2',
      description: 'AEROHAVEN Set Of 5 Multi Colored Decorative Hand Made Jute...',
      price: '₹220.00',
      originalPrice: '₹999.00'
    },
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'Featured now 3',
      description: 'AEROHAVEN Set Of 5 Multi Colored Decorative Hand Made Jute...',
      price: '₹220.00',
      originalPrice: '₹999.00'
    },
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'Featured now 4',
      description: 'AEROHAVEN Set Of 5 Multi Colored Decorative Hand Made Jute...',
      price: '₹220.00',
      originalPrice: '₹999.00'
    },
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'Featured now 5',
      description: 'Home Sizzler Set of 2 Door Curtains - 7 Feet Long',
      price: '₹451.00',
      originalPrice: '₹999.00'
    },
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'Featured now 6',
      description: 'TIED RIBBONS Cycle Shape Flower Vase with Peonies Bunches...',
      price: '₹449.00',
      originalPrice: '₹1,099.00'
    },
    {
      image: '/images/idol.jpg',
      title: '60% off',
      description: 'Collectible India Peacock Design Radha Krishna Idol...',
      price: '₹398.00',
      originalPrice: '₹999.00'
    },
    {
      image: 'http://stickwellpapers.com/images/media/2021/06/medium1622801240VkSAb04310.jpg',
      title: 'New Arrival 7',
      description: 'Stylish Decorative Lamp with Modern Design',
      price: '₹599.00',
      originalPrice: '₹1,299.00'
    }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex + 4 < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="content-center text-center py-4">
        <h1 className="text-3xl font-bold">PRODUCT CATEGORIES</h1>
      </div>
      <div className="flex">
        {products.slice(startIndex, startIndex + 4).map((product, index) => (
          <div key={index} className="w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg border p-4 h-72 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-blue-500">
            <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              {product.title && <div className="text-red-600 font-bold">{product.title}</div>}
              <p className="text-sm text-gray-700 mb-2">{product.description}</p>
              <div className="font-bold text-lg text-black">{product.price} <span className="text-gray-400 line-through">{product.originalPrice}</span></div>
              <Link href="/details" passHref  className="bg-blue-300 lg:m-2 px-4 py-2 rounded-md inline-block">
               Read More
              </Link>
            </div>

            <div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow-md rounded-full">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow-md rounded-full">
        <FaChevronRight />
      </button>
    </div>
  );
};