"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const TopSelling = () => {
  const products = [
    {
      image:
        "http://stickwellpapers.com/images/media/2021/06/medium1622810876jfv2v04312.jpg",
      title: "Featured now",
      description:
        "AEROHAVEN Set Of 5 Multi Colored Decorative Hand Made Jute...",
      price: "₹220.00",
      originalPrice: "₹999.00",
    },
    {
      image:
        "http://stickwellpapers.com/images/media/2021/06/medium1622810876jfv2v04312.jpg",
      title: "60% off",
      description: "Home Sizzler Set of 2 Door Curtains - 7 Feet Long",
      price: "₹451.00",
      originalPrice: "₹999.00",
    },
    {
      image:
        "http://stickwellpapers.com/images/media/2021/06/medium1622810876jfv2v04312.jpg",
      title: "60% off",
      description:
        "TIED RIBBONS Cycle Shape Flower Vase with Peonies Bunches...",
      price: "₹449.00",
      originalPrice: "₹1,099.00",
    },
    {
      image:
        "http://stickwellpapers.com/images/media/2021/06/medium1622810876jfv2v04312.jpg",
      title: "60% off",
      description: "Collectible India Peacock Design Radha Krishna Idol...",
      price: "₹398.00",
      originalPrice: "₹999.00",
    },
    {
      image:
        "http://stickwellpapers.com/images/media/2021/06/medium1622810876jfv2v04312.jpg",
      title: "New Arrival",
      description: "Stylish Decorative Lamp with Modern Design",
      price: "₹599.00",
      originalPrice: "₹1,299.00",
    },
  ];

  const videos = [
    { url: "https://www.youtube.com/embed/xyz123", title: "Product Video 1" },
    { url: "https://www.youtube.com/embed/abc456", title: "Product Video 2" },
    { url: "https://www.youtube.com/embed/def789", title: "Product Video 3" },
    { url: "https://www.youtube.com/embed/ghi012", title: "Product Video 4" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

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

  const nextVideo = () => {
    if (videoIndex + 2 < videos.length) {
      setVideoIndex(videoIndex + 1);
    }
  };

  const prevVideo = () => {
    if (videoIndex > 0) {
      setVideoIndex(videoIndex - 1);
    }
  };

  return (
    <div className="container bg-blue-100">
      <div className="content-center text-center py-4">
        <h1 className="text-3xl font-bold">Top Selling of the Week</h1>
      </div>
      <div className="container flex py-4  mx-auto p-4 relative">
        {products.slice(startIndex, startIndex + 4).map((product, index) => (
          <div key={index} className="w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg border p-4 h-72 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-blue-500">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              {product.title && (
                <div className="text-red-600 font-bold">{product.title}</div>
              )}
              <p className="text-sm text-gray-700 mb-2">
                {product.description}
              </p>
              <div className="font-bold text-lg text-black">
                {product.price}{" "}
                <span className="text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              </div>
              
            </div>
            
          </div>
        ))}
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full shadow-md 
          ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={startIndex === 0}
        >
          <FaChevronLeft />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full shadow-md 
          ${startIndex + 4 >= products.length ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={startIndex + 4 >= products.length}
        >
          <FaChevronRight />
        </button>
      </div>
{/* Video */}
      <div className="container mx-auto p-4 relative">
        <div className="content-center text-center">
          <h1 className="text-3xl font-bold py-4">VIDEOS</h1>
        </div>

        <div className="relative">
          <div className="flex p-2">
            {videos.slice(videoIndex, videoIndex + 2).map((video, index) => (
              <div key={index} className="w-1/2 p-2">
                <div className="bg-white shadow-md rounded-lg border p-4">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-40 rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="text-center mt-2 text-black font-bold">
                    {video.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between p-2">
            <button
              onClick={prevVideo}
              className={`p-2 bg-blue-500 text-white rounded-full shadow-md ${
                videoIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={videoIndex === 0}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextVideo}
              className={`p-2 bg-blue-500 text-white rounded-full shadow-md ${
                videoIndex + 2 >= videos.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={videoIndex + 2 >= videos.length}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
