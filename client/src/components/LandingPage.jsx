import React from "react";
import image from "../assets/landing.jpg";

const LandingPage = ({ setIsVisible }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative flex flex-col items-center justify-center h-full p-6 z-10">
          <header className="w-full text-center py-8">
            <h1 className="text-4xl xs:text-2xl font-bold">
              Event Planning and Management Web App
            </h1>
            <p className="text-xl xs:text-base mt-4">
              Simplifying Your Event Planning Experience
            </p>
          </header>
          <h2 className="text-3xl xs:text-xl font-semibold mb-6">
            Select Your Event Type
          </h2>
          <select className="w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm text-lg xs:text-base outline-none bg-black/20">
            <option value="">Choose an Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="conference">Conference</option>
            <option value="corporate">Corporate Meeting</option>
          </select>
          <button
            className="bg-blue-600 px-8 py-4 rounded-lg text-xl xs:text-base mt-6 text-white"
            onClick={() => setIsVisible(false)}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
