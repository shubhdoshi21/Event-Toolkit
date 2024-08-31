import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const VerifyAccount = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/verify",
        {
          code: otpCode,
        },
        {
          withCredentials: true, 
        }
      );
      toast.success("User registered successfully!", {
        autoClose: 1500,
        closeButton: false,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Verification failed", error);
      setErrorMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center">
            {otp.map((data, index) => (
              <input
                className="m-2 h-10 w-10 text-center text-lg border rounded"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <p className="text-center text-red-600">{errorMessage}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Verify
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            onClick={() => alert("Resend feature not implemented")}
            className="font-medium text-blue-600 hover:underline"
          >
            Resend
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyAccount;
