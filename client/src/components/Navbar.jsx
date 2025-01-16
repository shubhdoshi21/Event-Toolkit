import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoCartOutline } from 'react-icons/io5';
import { BiLogIn } from 'react-icons/bi';
import ThemeConverter from './ThemeConvertor';
import Cookies from 'js-cookie';
import Logo from '../assets/logo.png';
import Search from './Common/Search';
import { Link, useNavigate } from 'react-router-dom';
import { setSelectedVenue } from '../features/venue/venueSlice';
import { setSelectedCity } from '../features/city/citySlice';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('true');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    venues: [],
    cities: [],
    vendors: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const { venues } = useSelector(state => state.venue);
  const { cities } = useSelector(state => state.city);
  const { vendors } = useSelector(state => state.vendor);

  useEffect(() => {
    const userToken = Cookies.get('accessToken');
    setIsLoggedIn(!!userToken);

    const storedTheme = localStorage.getItem('theme') || 'true';
    setTheme(storedTheme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(currTheme => !currTheme);
    localStorage.setItem('theme', !theme);
  };

  const handleCityClick = city => {
    dispatch(setSelectedCity(city));
    setSearchQuery('');
  };

  const handleVenueClick = venue => {
    dispatch(setSelectedVenue(venue));
    setSearchQuery('');
    navigate('/dateSelector');
  };

  const handleVendorClick = venue => {
    dispatch(setSelectedVenue(venue));
    setSearchQuery('');
    navigate('/dateSelector');
  };

  const handleSearch = e => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredVenues = venues.filter(venue =>
      venue.venueName.toLowerCase().includes(query),
    );
    const filteredCities = cities.filter(city =>
      city.cityName.toLowerCase().includes(query),
    );
    const filteredVendors = vendors.filter(vendor =>
      vendor.serviceName.toLowerCase().includes(query),
    );

    setSearchResults({
      venues: filteredVenues,
      cities: filteredCities,
      vendors: filteredVendors,
    });
  };

  const navbarClass =
    theme === 'false'
      ? 'bg-gray text-white shadow-lg shadow-pupll/20'
      : 'bg-lgrey text-black shadow-lg shadow-pupll/20';

  return (
    <nav

      className={`h-16 w-full flex items-center justify-between p-4  bg-opacity-80 backdrop-blur-lg fixed z-50 top-0 ${navbarClass}`}
    >
      <div className="text-xl font-bold ">

  
        <Link to="/home">
          <img src={Logo} alt="Logo" width="114px" height="114px" />
        </Link>
      </div>

      <div className="flex items-center">
        {/* Search */}
        <div className="relative lg:block mr-2">
          <input
            type="text"
            placeholder="Search..."

            value={searchQuery}
            onChange={handleSearch}
            className={`pl-3 pr-10 py-1 w-full bg-lightgrey z-30 relative border-2 border-pupll ${
              searchQuery ? '  rounded-t-lg' : ' rounded-full'
            }`}

          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 z-40">
            <FaSearch />
          </button>

          {/* Search Results */}
          <div className='absolute flex flex-col w-full'>
            <Search
              searchQuery={searchQuery}
              searchResults={searchResults.venues}
              dispatchFunction={handleVenueClick}
              variable={'Venues'}
              toDisplay={'venueName'}
            />
            <Search
              searchQuery={searchQuery}
              searchResults={searchResults.cities}
              dispatchFunction={handleCityClick}
              variable={'Cities'}
              toDisplay={'cityName'}
            />
            <Search
              searchQuery={searchQuery}
              searchResults={searchResults.vendors}
              dispatchFunction={handleCityClick}
              variable={'Vendors'}
              toDisplay={'serviceName'}
            />

          </div>
        </div>

        {/* Theme switch */}
        <div
          className="sm:flex sm:items-center sm:justify-center sm:h-full sm:p-2 cursor-pointer hover:bg-lightgreyplusplus rounded-[50%] mx-2"
          onClick={handleThemeChange}
        >
          <ThemeConverter />
        </div>

        {isLoggedIn && (
          <Link
            to="/cart"
            className="hidden sm:flex sm:hover:bg-lightgreyplusplus sm:hover:text-white font-bold px-2 py-2 rounded-[50%] transition-all duration-300 mr-2"
          >
            <IoCartOutline size={24} />
          </Link>
        )}

        <div className="hidden sm:flex sm:items-center sm:justify-center sm:h-full sm:p-2">
          {isLoggedIn ? (
            <Link to="/profile">
              <CgProfile size={24} />
            </Link>
          ) : (
            <Link to="/auth/signin">
              <BiLogIn size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* mobile menu  */}
      {isMenuOpen && (
        <div
          className={`absolute top-16 left-0 w-full shadow-md flex flex-col items-center py-4 sm:hidden z-40 ${navbarClass}`}
        >
          {/* Theme Button */}
          {/* <button
            className="flex items-center justify-center p-2 cursor-pointer hover:bg-lightgreyplusplus rounded-full mb-4"
            onClick={handleThemeChange}
          >
            <ThemeConverter />
            <span className="ml-2">Switch Theme</span>
          </button> */}

          {/* Cart and Profile */}
          <Link
            to={isLoggedIn ? '/profile' : '/auth/signin'}
            className="flex items-center justify-center hover:bg-lightgreyplusplus hover:text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            {isLoggedIn ? (
              <>
                <CgProfile size={24} />
                <span className="ml-2">Profile</span>
              </>
            ) : (
              <>
                <BiLogIn size={24} />
                <span className="ml-2">Login</span>
              </>
            )}
          </Link>

          {isLoggedIn && (
            <Link
              to="/cart"
              className="flex items-center justify-center hover:bg-lightgreyplusplus hover:text-white font-bold px-4 py-2 rounded-full transition-all duration-300 mt-2"
            >
              <IoCartOutline size={24} />
              <span className="ml-2">Cart</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
