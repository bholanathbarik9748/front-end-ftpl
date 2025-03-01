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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating user authentication

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="w-full border-b bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
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

        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {["Home", "Labels Shop", "Custom Labels Draw"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05, opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="#"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                {item}
              </a>
            </motion.li>
          ))}

          <motion.li
            className="relative cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 text-gray-700 hover:text-orange-600 transition">
              Categories <FiChevronDown className="text-sm" />
            </div>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-10 bg-white shadow-lg rounded-lg w-56 py-3"
                >
                  {categoryList.map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="block px-5 py-2 text-gray-700 hover:bg-gray-100 transition"
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

        <div className="flex items-center space-x-4 md:space-x-6">
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
                    className="bg-transparent outline-none w-full"
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
          <FiShoppingBag className="text-2xl text-gray-700 hover:text-orange-500 cursor-pointer transition" />

          {/* Show login button if user is not logged in, else show user icon */}
          {isLoggedIn ? (
            <FiUser className="text-2xl text-gray-700 hover:text-blue-500 cursor-pointer transition" />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

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
            <ul className="space-y-5 text-lg font-medium">
              {["Home", "Labels Shop", "Custom Labels Draw"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05, opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href="#"
                      className="block text-gray-700 hover:text-orange-600 transition"
                    >
                      {item}
                    </a>
                  </motion.li>
                )
              )}
              <li>
                <details className="group">
                  <summary className="flex items-center justify-between text-gray-700 hover:text-orange-600 transition cursor-pointer">
                    Categories
                    <FiChevronDown className="text-sm" />
                  </summary>
                  <ul className="mt-2 pl-4 space-y-2 text-gray-700">
                    {categoryList.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block hover:text-orange-600 transition"
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
