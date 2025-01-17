import React, { useEffect, useState } from 'react';
import { LocationCard } from '../index.js';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { setSelectedVenue } from '../../features/venue/venueSlice.js';
import axios from 'axios';

const Venues = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/venues/getAllVenues`,
        );
        if (response?.data?.statusCode <= 200) {
          setVenues(response.data.data?.data);
        }
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };
    getVenues();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-primaryBlack">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Venues</h2>
      <div className="ml-[5%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {venues.length !== 0 ? (
            venues.map((venue) => (
              <LocationCard
                key={venue._id}
                modal={venue}
                message={'Add Sub Venue'}
                navigateTo={'/panel/add-sub-venues'}
                dispatchAction={setSelectedVenue}
              />
            ))
          ) : (
            <div className="flex flex-col items-center text-center p-6 w-full">
              <FaMapMarkerAlt className="text-6xl text-gray-400 mb-4" />
              <h1 className="text-2xl font-semibold uppercase">
                No venues available at the city...
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Venues;
