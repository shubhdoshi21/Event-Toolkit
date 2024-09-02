import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCity, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import {
  Navbar,
  Modal,
  ModalButton,
  LocationCard,
  Footer,
  ReviewCard,
  Carousal,
  Sidebar,
} from "../components/index.js";

const Home = () => {
  const images = [
    {
      src: "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
      alt: "Event 1",
    },
    {
      src: "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
      alt: "Event 2",
    },
    {
      src: "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
      alt: "Event 3",
    },
  ];

  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [openModals, setOpenModals] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const containerRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const getCities = async () => {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cities/getAllCitiesExceptSelected",
        { excludedCity: selectedCity ? selectedCity : "Agra1" }
      );
      if (response.data.statusCode <= 200)
        setCities(response?.data?.data?.data);
    };

    getCities();
  }, [selectedCity]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/reviews/getAllReviews"
      );
      if (response?.data?.statusCode <= 200) {
        setReviews(response.data.data?.data);
      }
    };
    getReviews();
  }, []);

  useEffect(() => {
    const getVenues = async () => {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cities/getAllVenuesAtCity",
        { cityName: selectedCity ? selectedCity : "Agra1" }
      );
      if (response?.data?.statusCode <= 200) {
        setVenues(response.data.data?.data);
      }
    };
    getVenues();
  }, []);

  const openModal = (modalId) => {
    setOpenModals({ ...openModals, [modalId]: true });
  };

  const closeModal = (modalId) => {
    setOpenModals({ ...openModals, [modalId]: false });
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleExploreClick = (cityName) => {
    setSelectedCity(cityName);
  };

  return (
    <div className="min-h-screen">
      <Navbar onSidebarToggle={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Modals for diff cities */}
      <div className="flex items-center justify-center py-6 pt-20 relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 z-10 bg-gray-600 text-white p-2 rounded-full text-2xl font-bold hover:bg-gray-500 transition-colors"
        >
          &lt;
        </button>
        <div
          ref={containerRef}
          className="flex gap-4 p-4 overflow-x-auto hide-scrollbar"
          style={{ maxHeight: "200px", whiteSpace: "nowrap" }}
        >
          {cities.length !== 0 ? (
            cities.map((city) => (
              <ModalButton
                key={city._id}
                modal={city}
                onClick={() => openModal(city._id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center text-center p-6">
              <FaCity className="text-6xl text-gray-400 mb-4" />
              <h1 className="text-xl font-semibold uppercase">
                No cities to display currently
              </h1>
            </div>
          )}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 bg-gray-600 text-white p-2 rounded-full text-2xl font-bold hover:bg-gray-500 transition-colors"
        >
          &gt;
        </button>

        {cities.map((city) => (
          <Modal
            key={city._id}
            isOpen={openModals[city._id]}
            onClose={() => closeModal(city._id)}
            title={city.cityName}
            handleExploreClick={handleExploreClick}
            name={city.cityName}
          >
            <img
              src={city.cityImage}
              alt={city.cityName}
              className=" min-w-90 min-h"
            />
            <p className="text-black mt-2">{city.cityDescription}</p>
          </Modal>
        ))}
      </div>

      {/* images carousal */}
      <div className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Recent Events</h2>
        <Carousal images={images} />
      </div>

      {/* exploring locations */}
      <div className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Locations at Your City
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {venues.length !== 0 ? (
            venues.map((venue) => (
              <LocationCard
                modal={venue}
                handleExploreClick={handleExploreClick}
              />
            ))
          ) : (
            <div className="flex flex-col items-center text-center p-6 w-screen">
              <FaMapMarkerAlt className="text-6xl text-gray-400 mb-4" />
              <h1 className="text-2xl font-semibold uppercase">
                No venues available at the city...
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* reviews */}
      <div className="py-8 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.length !== 0 ? (
            reviews.map((review) => <ReviewCard review={review} />)
          ) : (
            <div className="flex flex-col items-center p-6 w-screen ">
            <FaCommentDots className="text-6xl text-gray-400 mb-4" />
            <h1 className="text-2xl font-semibold uppercase text-white">
              No reviews to display
            </h1>
          </div>
          )}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
