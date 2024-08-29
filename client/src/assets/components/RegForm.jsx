import React from 'react';

const RegForm = () => {
  return (
    <div className="flex items-center justify-center mx-5 w-[100%] md:w-[40%]">
      <div className="w-full max-w-md p-8 bg-grey bg-opacity-20 rounded-lg shadow-lg">
        <h2 className="text-offwhite text-4xl font-bold mb-8 text-center">Register Now</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="caterer">
              Select Caterer
            </label>
            <select
              id="caterer"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
            >
              <option value="">Select a caterer</option>
              <option value="caterer1">Caterer 1</option>
              <option value="caterer2">Caterer 2</option>
              <option value="caterer3">Caterer 3</option>
            </select>
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="decorator">
              Select Decorator
            </label>
            <select
              id="decorator"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
            >
              <option value="">Select a decorator</option>
              <option value="decorator1">Decorator 1</option>
              <option value="decorator2">Decorator 2</option>
              <option value="decorator3">Decorator 3</option>
            </select>
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="photographer">
              Select Photographer
            </label>
            <select
              id="photographer"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
            >
              <option value="">Select a photographer</option>
              <option value="photographer1">Photographer 1</option>
              <option value="photographer2">Photographer 2</option>
              <option value="photographer3">Photographer 3</option>
            </select>
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="event-date">
              Event Date
            </label>
            <input
              type="date"
              id="event-date"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
            />
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="message">
              Additional Details
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              placeholder="Tell us more about your event..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-mauve text-offwhite text-lg font-semibold rounded-md hover:bg-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegForm;
