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

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value) || value === "") return;

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace action

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        document.querySelectorAll('input[name="otp"]')[index - 1].focus();
      }
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
      toast.success("User Vefiried successfully!", {
        autoClose: 1500,
        closeButton: false,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Verification failed!", {
        autoClose: 1500,
        closeButton: false,
      });
      setErrorMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify your account</h1>
          <p className="mt-2 text-sm">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center">
            {otp.map((data, index) => (
              <input
                className="m-2 h-10 w-10 text-center text-lg border rounded bg-transparent outline-none"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <p className="text-center text-red">{errorMessage}</p>
          <button
            type="submit"
            className="w-full bg-[#FF5364] hover:bg-[#FF5364]/80 text-white p-2 font-bold rounded-md"
          >
            Verify
          </button>
        </form>
        <div className="text-center text-sm">
          Didn’t receive the code?
          <button
            onClick={() => alert("Resend feature not implemented")}
            className="text-[#FF5364] hover:underline px-1"
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