import React from "react";

const LocationCard = ({ modal }) => {
  return (
    <div
      key={modal._id}
      className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
    >
      <img
        src={modal.venueImage}
        alt={modal.venueName}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{modal.venueName}</h3>
        <p className="text-gray-300 mt-2">{modal.venueDescription}</p>
      </div>
      <button className="w-full h-[50px] bg-red">See Location</button>
    </div>
  );
};

export default LocationCard;
