import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="bg-white backdrop-blur-md bg-opacity-80 rounded-lg shadow-lg p-8 text-center w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FaExclamationCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-purple-600 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but your payment could not be processed. Please try again
          or contact support for assistance.
        </p>
        <Link to="/">
          <button className="bg-[#9333ea] hover:bg-[#9333ea]/80 text-white px-6 py-2 rounded-full font-bold transition-colors">
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
