import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestOTP = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/v1/users/forgot-password/request-otp", {
        email,
      });

      toast.success("OTP sent to your email!", {
        autoClose: 1500,
        closeButton: false,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <fieldset className="border-2 border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-1">Forget Password</legend>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md outline-none bg-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white p-2 rounded-md mt-4 bg-[#FF5364] hover:bg-[#FF5364]/80"
            onClick={handleSubmit}
          >
            Send OTP
          </button>
        </fieldset>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RequestOTP;
