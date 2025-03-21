"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getActiveBanner } from "./services";
import { useRouter } from "next/navigation";

export const Banner = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getActiveBanner"],
    queryFn: getActiveBanner,
  });

  const slides = response?.data?.banners || [];
  console.log(error);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error || slides.length === 0)
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        No banners available
      </div>
    );

  return (
    <div
      className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[80vh] overflow-hidden shadow-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slider */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[currentIndex]?.image_link}
          src={slides[currentIndex]?.image_link}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover top-0 brightness-[85%]"
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          loading="lazy"
        />
      </AnimatePresence>

      {/* Gradient Overlay & Content */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent flex items-center justify-end px-6 sm:px-12">
        <div className="text-white space-y-4 sm:space-y-6 max-w-xs sm:max-w-md md:max-w-lg text-right">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slides[currentIndex]?.name}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              {slides[currentIndex]?.name}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={slides[currentIndex]?.head_description}
              className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {slides[currentIndex]?.head_description}
            </motion.p>
          </AnimatePresence>
          <motion.button
            className="px-5 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-lg text-white font-semibold text-base sm:text-lg rounded-full hover:bg-white/30 transition duration-300 shadow-md"
            aria-label="Explore Now"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(slides[currentIndex]?.btn_link)}
          >
            Explore Now
          </motion.button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black/30 p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
            aria-label="Previous Slide"
          >
            <AiOutlineLeft className="text-xl sm:text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black/30 p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
            aria-label="Next Slide"
          >
            <AiOutlineRight className="text-xl sm:text-2xl" />
          </button>
        </>
      )}
    </div>
  );
};
