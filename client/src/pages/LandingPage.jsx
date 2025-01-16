import React, { useEffect, useState } from "react";
import image from "../assets/e4.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "../features/city/citySlice";

const LandingPage = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedCity = useSelector((state) => state.city.selectedCity);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/cities/getAllCitiesExceptSelected`
        );
        setCities(response?.data?.data?.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const city = cities.find((city) => city._id === selectedCityId);
    dispatch(setSelectedCity(city));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative flex flex-col items-center justify-center h-full p-6 z-10">
          <header className="w-full text-center py-8">
            <h1 className="text-7xl xs:text-2xl abril-fatface-regular  text-violet-200">
              Event Toolkit
            </h1>
            <p className="text-2xl xs:text-base mt-4 playfair-display text-lgrey">
              Simplifying Your Event Planning Experience
            </p>
          </header>
          <h2 className="text-3xl xs:text-xl font-semibold mb-6  playfair-display text-lgrey" >
            Select Your City
          </h2>
          <select
            className="w-2/3 p-3 border border-lgrey/40 backdrop-blur-sm rounded-lg shadow-sm text-lg xs:text-base outline-none bg-grey/20 text-lgrey"
            value={selectedCity?._id || ""}
            onChange={handleCityChange}
          >
            <option value=""  className="text-lgrey">Choose a City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id} className="text-purpl border border-lgrey/40 backdrop-blur-sm">
                {city.cityName}
              </option>
            ))}
          </select>
          <Link to="/home">
            <button
              className={`bg-lightpurple playfair-display hover:bg-[#9333ea]/80 px-8 py-4 rounded-lg text-xl xs:text-base mt-6 text-white ${
                !selectedCity ? "cursor-not-allowed" : ""
              }`}
              disabled={!selectedCity}
            >
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
