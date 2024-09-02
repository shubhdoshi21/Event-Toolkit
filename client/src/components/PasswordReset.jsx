import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRequestOtp = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/users/forgot-password/request-otp",
        { email: formData.email }
      );
      setIsOtpRequested(true);
      toast.success("OTP sent to your email!", {
        autoClose: 1500,
        closeButton: false,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/v1/users/forgot-password/verify-otp",
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );

      toast.success("Password has been reset successfully!", {
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
          <legend className="text-lg font-semibold px-1">Reset Password</legend>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md outline-none bg-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="button"
                className="ml-2 text-white p-2 rounded-md bg-[#FF5364] hover:bg-[#FF5364]/80"
                onClick={handleRequestOtp}
                disabled={!formData.email}
              >
                Send OTP
              </button>
            </div>
          </div>

          {isOtpRequested && (
            <>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="mt-1 p-2 w-full border rounded-md outline-none bg-transparent"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="mt-1 p-2 w-full border rounded-md outline-none bg-transparent"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white p-2 rounded-md mt-4 bg-[#FF5364] hover:bg-[#FF5364]/80"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </>
          )}
        </fieldset>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;
