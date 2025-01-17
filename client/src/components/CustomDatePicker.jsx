import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../features/date/dateSlice.js";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startDate, endDate } = useSelector((state) => state.date);
  const [hoverDate, setHoverDate] = useState(null);

  const handleConfirmClick = () => {
    navigate("/registration");
  };

  const handleCancelClick = () => {
    navigate("/home");
  }

  const formatDate = (date) => {
    if (!date) return "Select date";
    return date.toLocaleDateString("en-US", {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#0A0118]">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-purple-500/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 left-0 h-[500px] bg-gradient-to-tr from-indigo-500/20 via-transparent to-transparent blur-3xl" />
      
      <Modal
        isOpen={true}
        className="relative bg-gray-900/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl max-w-xl mx-auto border border-gray-800/50 animate-pulse-subtle"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center backdrop-blur-sm"
        ariaHideApp={false}
      >
        <div className="space-y-8">
          {/* Rest of the component remains exactly the same */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Select Date Range
              </h2>
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-400" onClick={handleCancelClick}/>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-1">Start Date</p>
                <p className="text-white font-medium">
                  {formatDate(startDate)}
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-1">End Date</p>
                <p className="text-white font-medium">
                  {formatDate(endDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
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
              onDayMouseEnter={setHoverDate}
              onDayMouseLeave={() => setHoverDate(null)}
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="flex justify-between items-center px-4 py-3 text-white">
                  <button
                    onClick={decreaseMonth}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-300" />
                  </button>
                  <span className="text-white font-medium">
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                  <button
                    onClick={increaseMonth}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              )}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <button
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
              onClick={() => {
                dispatch(setStartDate(null));
                dispatch(setEndDate(null));
              }}
            >
              Clear selection
            </button>
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40"
              onClick={handleConfirmClick}
              disabled={!startDate || !endDate}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </Modal>

      <style>
        {`
          @keyframes pulse-subtle {
            0% { box-shadow: 0 0 50px 10px rgba(168,85,247,0.15); }
            50% { box-shadow: 0 0 50px 10px rgba(168,85,247,0.25); }
            100% { box-shadow: 0 0 50px 10px rgba(168,85,247,0.15); }
          }
          .animate-pulse-subtle {
            animation: pulse-subtle 3s ease-in-out infinite;
          }
          .react-datepicker {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
            background-color: transparent !important;
            border: none !important;
          }
          .react-datepicker__month-container {
            background-color: transparent !important;
          }
          .react-datepicker__header {
            background-color: transparent !important;
            border-bottom: none !important;
            padding-top: 0 !important;
          }
          .react-datepicker__day-name {
            color: rgb(156, 163, 175) !important;
            margin: 0.5rem !important;
            font-size: 0.875rem !important;
            width: 2rem !important;
          }
          .react-datepicker__day {
            color: rgb(229, 231, 235) !important;
            margin: 0.5rem !important;
            width: 2rem !important;
            height: 2rem !important;
            line-height: 2rem !important;
            border-radius: 0.5rem !important;
            font-size: 0.875rem !important;
          }
          .react-datepicker__day:hover {
            background-color: rgba(124, 58, 237, 0.1) !important;
          }
          .react-datepicker__day--selected,
          .react-datepicker__day--in-selecting-range,
          .react-datepicker__day--in-range {
            background: linear-gradient(to right, rgb(124, 58, 237), rgb(99, 102, 241)) !important;
            color: white !important;
            font-weight: 500 !important;
          }
          .react-datepicker__day--keyboard-selected {
            background: linear-gradient(to right, rgb(124, 58, 237), rgb(99, 102, 241)) !important;
            color: white !important;
          }
          .react-datepicker__day--outside-month {
            color: rgb(75, 85, 99) !important;
          }
          .react-datepicker__triangle {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default CustomDatePicker;