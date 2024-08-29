import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";

const Navbar = ({ onSidebarToggle }) => {
  return (
    <nav className="h-16 w-full flex items-center justify-between bg-white text-black p-4 shadow-lg bg-opacity-90">
      <div className="text-xl font-bold">logo</div>

      <div className="hidden sm:flex lg:space-x-12">
        <a
          href="#home"
          className="hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          Home
        </a>
        <a
          href="#about"
          className="hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          About
        </a>
        <a
          href="#services"
          className="hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          Services
        </a>
        <a
          href="#contact"
          className="hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          Contact
        </a>
      </div>

      <div className="relative lg:block">
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="pl-3 pr-10 py-1 rounded-full text-black bg-lightgrey"
        />
      </div>

      <button
        className="sm:hidden text-2xl"
        onClick={onSidebarToggle}
      >
        <FaBars />
      </button>
    </nav>
  );
};

export default Navbar;
