import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <fieldset className="border-2 border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-1">Sign In</legend>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md outline-none bg-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md outline-none bg-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600">
            Sign In
          </button>

          <p className="mt-4 text-center text-sm">
            Don't have an account?
            <Link to="/auth/signup" className="text-blue-500 hover:underline px-1">
              Sign Up
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Signin;
