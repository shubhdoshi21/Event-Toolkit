import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { setStartDate, setEndDate } from "../features/date/dateSlice.js";
import { useDispatch, useSelector } from "react-redux";

const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startDate, endDate } = useSelector((state) => state.date);

  const handleConfirmClick = () => {
    navigate("/registration");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-900 to-indigo-900">
      <Modal
        isOpen={true}
        className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
        ariaHideApp={false} // Avoids app element error
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Select a Date Range
        </h2>
        <div className="flex justify-center mb-4">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              dispatch(setStartDate(start));
              dispatch(setEndDate(end));
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className=" text-white rounded-lg p-2"
            calendarClassName="text-white border border-gray-700"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomDatePicker;
