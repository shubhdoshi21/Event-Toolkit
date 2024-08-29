import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  // Array of feature objects
  const features = [
    {
      id: 1,
      bgClass: "bg-guest-list",
      text: "Manage guest lists with ease and track RSVPs in real-time.",
    },
    {
      id: 2,
      bgClass: "bg-budget",
      text: "Stay on budget with our powerful expense tracking tools.",
    },
    {
      id: 3,
      bgClass: "bg-task",
      text: "Assign and track tasks to ensure nothing is missed.",
    },
    {
      id: 4,
      bgClass: "bg-vendor",
      text: "Coordinate with vendors and manage contracts effortlessly.",
    },
    {
      id: 5,
      bgClass: "bg-invite",
      text: "Design and distribute beautiful invitations with our templates.",
    },
    {
      id: 6,
      bgClass: "bg-seating",
      text: "Create interactive seating arrangements with ease.",
    },
  ];

  return (
    <div className="w-full flex flex-row sm:flex-col min-h-screen items-center justify-center p-5">
      <div className="w-2/3 text-center font-bold text-lg p-6 sm:w-full">
        <h1 className="w-full p-4 text-2xl">
          Sign up &amp; start planning your Perfect Event!
        </h1>
        <h3 className="font-semibold text-xl">Why sign up?</h3>

        <div className="flex flex-wrap mt-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center justify-center text-center w-1/3 md:w-1/2 xs:w-full p-2"
            >
              <div
                className={`w-28 h-28 border-2 ${feature.bgClass} bg-center bg-no-repeat `}
              ></div>
              <p className="text-sm">{feature.text}</p>
            </div>
          ))}
          <h4 className="w-full text-lg font-semibold mt-4">
            And much more...!
          </h4>
        </div>
      </div>
      <div className="w-1/3 text-center p-6 sm:w-full">
        <form>
          <fieldset className="border-2 border-gray-300 rounded-lg mb-4">
            <legend className="text-left px-1">First Name</legend>

            <input
              type="text"
              id="firstName"
              className="p-2 w-full border-none outline-none bg-transparent rounded-md"
              placeholder="Enter your first name"
            />
          </fieldset>

          <fieldset className="border-2 border-gray-300 rounded-lg mb-4">
            <legend className="text-left px-1">Last Name</legend>

            <input
              type="text"
              id="lastName"
              className="p-2 w-full border-none outline-none bg-transparent rounded-md"
              placeholder="Enter your last name"
            />
          </fieldset>

          <fieldset className="border-2 border-gray-300 rounded-lg mb-4">
            <legend className="text-left px-1">Email</legend>

            <input
              type="email"
              id="email"
              className="p-2 w-full border-none outline-none bg-transparent rounded-md"
              placeholder="Enter your email"
            />
          </fieldset>

          <fieldset className="border-2 border-gray-300 rounded-lg mb-4">
            <legend className="text-left px-1">Password</legend>

            <input
              type="password"
              id="password"
              className="p-2 w-full border-none outline-none bg-transparent rounded-md"
              placeholder="Enter your password"
            />
          </fieldset>

          <fieldset className="border-2 border-gray-300 rounded-lg mb-4">
            <legend className="text-left px-1">Confirm Password</legend>

            <input
              type="password"
              id="confirmPassword"
              className="p-2 w-full border-none outline-none bg-transparent rounded-md"
              placeholder="Confirm your password"
            />
          </fieldset>

          <button className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600">
            Sign Up
          </button>

          <div className="mt-4 sm:mb-20 text-sm">
            Already have an account?
            <Link
              to="/auth/signin"
              className="text-blue-500 hover:underline px-1"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
