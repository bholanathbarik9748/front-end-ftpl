"use client";
import { useEffect, useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import mainLogo from "../../assets/main_logo.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const categoryList = [
  "A4 Label Sheet",
  "Label Rolls",
  "Thermal POS Rolls",
  "Thermal Ribbons",
  "Small Label Sheets",
  "Pre-Printed Labels",
];

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("access_token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="w-full border-b bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left Side: Logo & Menu */}
        <div className="flex items-center space-x-6">
          <button
            className="md:hidden text-2xl text-gray-700 hover:text-black transition"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>

          <div className="cursor-pointer">
            <Image
              src={mainLogo}
              alt="Logo"
              className="h-10 w-auto"
              width={550}
              height={40}
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 text-[16px] font-semibold text-gray-700">
            {["Home", "Newly Releases", "Bestsellers"].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <a href="#" className="hover:text-secondary_dark transition">
                  {item}
                </a>
              </motion.li>
            ))}

            {/* Categories Dropdown */}
            <motion.li
              className="relative cursor-pointer"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 hover:text-secondary_dark transition">
                Categories <FiChevronDown className="text-sm" />
              </div>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-10 bg-white shadow-lg rounded-lg w-60 py-3 text-gray-700 z-10"
                  >
                    {categoryList.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block px-5 py-2 hover:bg-gray-100 transition"
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          </ul>
        </div>

        {/* Right Side: Search & User Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Search Input */}
          <div className="relative">
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700"
                  />
                  <FiX
                    className="text-xl text-gray-600 cursor-pointer"
                    onClick={() => setSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <FiSearch
                  className="text-2xl text-gray-700 hover:text-black cursor-pointer transition"
                  onClick={() => setSearchOpen(true)}
                />
              )}
            </AnimatePresence>
          </div>

          <FiHeart className="text-2xl text-gray-700 hover:text-red-500 cursor-pointer transition" />
          <FiShoppingBag className="text-2xl text-gray-700 hover:text-secondary_mid cursor-pointer transition" />

          {/* Login or User Icon */}
          {isLoggedIn ? (
            <FiUser className="text-2xl text-gray-700 hover:text-primary_dark cursor-pointer transition" />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-secondary_mid text-white rounded-lg hover:bg-secondary_dark transition font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50"
          >
            <button
              className="text-2xl text-gray-700 hover:text-black transition mb-6"
              onClick={() => setIsOpen(false)}
            >
              <FiX />
            </button>
            <ul className="space-y-5 text-[16px] font-semibold text-gray-700">
              {["Home", "Labels Shop", "Custom Labels Draw"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05, opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href="#"
                      className="block hover:text-secondary_dark transition"
                    >
                      {item}
                    </a>
                  </motion.li>
                )
              )}
              <li>
                <details className="group">
                  <summary className="flex items-center justify-between hover:text-secondary_dark transition cursor-pointer">
                    Categories
                    <FiChevronDown className="text-sm" />
                  </summary>
                  <ul className="mt-2 pl-4 space-y-2 text-gray-700">
                    {categoryList.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block hover:text-secondary_dark transition"
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
