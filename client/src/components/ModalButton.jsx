import React from "react";

const ModalButton = ({ modal, onClick }) => {
  return (
    <button
      key={modal._id}
      onClick={onClick}
      className="relative min-w-[150px] min-h-[150px] rounded-full hover:opacity-80 border-2"
      style={{
        backgroundImage: `url(${modal.cityImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className="absolute top-2/5 left-1/2 transform -translate-x-1/2 px-2 py-1 text-white font-bold text-lg rounded w-full">
        {modal.cityName}
      </span>
    </button>
  );
};

export default ModalButton;
