import React from "react";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`z-50 fixed top-0 right-0 w-64 h-full bg-white text-black p-4 shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button
        className="text-2xl absolute top-4 right-4"
        onClick={onClose}
      >
        <FaTimes />
      </button>
      <div className="mt-12">
        <a
          href="#home"
          className="block hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          Home
        </a>
        <a
          href="#about"
          className="block hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          About
        </a>
        <a
          href="#services"
          className="block hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          Services
        </a>
        <a
          href="#contact"
          className="block hover:bg-lightgreyplusplus hover:text-white font-bold px-3 py-1 rounded-md transition-all duration-300"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
