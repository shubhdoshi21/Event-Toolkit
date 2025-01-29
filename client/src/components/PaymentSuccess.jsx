import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const userId = useSelector((state) => state.user?._id); // Fetch userId from Redux store

  useEffect(() => {
    if (userId) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/clear-cart`, {
          userId,
        })
        .then(() => {
          toast.success("Cart cleared successfully!", { autoClose: 1500 });
        })
        .catch((error) => {
          console.error("Error clearing cart:", error);
          toast.error("Failed to clear cart.");
        });
    }
  }, [userId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="bg-white backdrop-blur-md bg-opacity-80 rounded-lg shadow-lg p-8 text-center w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FaCheckCircle size={48} className="text-[#9333ea]" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
        <p className="text-gray-600 mb-6">
          Great news! Your payment has been processed successfully. Thank you
          for your purchase.
        </p>
        <Link to="/">
          <button className="text-white bg-[#9333ea] hover:bg-[#9333ea]/80 px-6 py-2 rounded-full font-bold transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
