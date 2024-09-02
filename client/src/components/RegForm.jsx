import React, { useState } from 'react';

const RegForm = () => {
  const [selectedCaterer, setSelectedCaterer] = useState('');
  const [selectedDecorator, setSelectedDecorator] = useState('');
  const [selectedPhotographer, setSelectedPhotographer] = useState('');

  const catererPackages = {
    caterer1: ['Package 1', 'Package 2', 'Package 3'],
    caterer2: ['Package A', 'Package B'], 
    caterer3: ['Package X', 'Package Y', 'Package Z'],
  };

  const decoratorPackages = {
    decorator1: ['Package 1', 'Package 2'],
    decorator2: ['Package A', 'Package B', 'Package C'],
    decorator3: ['Package X', 'Package Y'],
  };

  const photographerPackages = {
    photographer1: ['Package 1', 'Package 2', 'Package 3'],
    photographer2: ['Package A', 'Package B'],
    photographer3: ['Package X', 'Package Y', 'Package Z'],
  };

  const handleCatererChange = (e) => {
    setSelectedCaterer(e.target.value);
  };

  const handleDecoratorChange = (e) => {
    setSelectedDecorator(e.target.value);
  };

  const handlePhotographerChange = (e) => {
    setSelectedPhotographer(e.target.value);
  };

  return (
    <div className="flex items-center justify-center mx-5 w-[100%] md:w-[40%]">
      <div className="w-full max-w-md p-8 bg-grey bg-opacity-20 rounded-lg shadow-lg">
        <h2 className="text-offwhite text-4xl font-bold mb-8 text-center">Register Now</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="caterer">
              Select Caterer
            </label>
            <select
              id="caterer"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              onChange={handleCatererChange}
              value={selectedCaterer}
            >
              <option value="">Select a caterer</option>
              <option value="caterer1">Caterer 1</option>
              <option value="caterer2">Caterer 2</option>
              <option value="caterer3">Caterer 3</option>
            </select>
          </div>
          {selectedCaterer && (
            <div>
              <label className="block text-grey text-sm font-medium mb-2" htmlFor="catererPackage">
                Select Caterer Package
              </label>
              <select
                id="catererPackage"
                className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              >
                {catererPackages[selectedCaterer].map((pkg, index) => (
                  <option key={index} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="decorator">
              Select Decorator
            </label>
            <select
              id="decorator"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              onChange={handleDecoratorChange}
              value={selectedDecorator}
            >
              <option value="">Select a decorator</option>
              <option value="decorator1">Decorator 1</option>
              <option value="decorator2">Decorator 2</option>
              <option value="decorator3">Decorator 3</option>
            </select>
          </div>
          {selectedDecorator && (
            <div>
              <label className="block text-grey text-sm font-medium mb-2" htmlFor="decoratorPackage">
                Select Decorator Package
              </label>
              <select
                id="decoratorPackage"
                className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              >
                {decoratorPackages[selectedDecorator].map((pkg, index) => (
                  <option key={index} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="photographer">
              Select Photographer
            </label>
            <select
              id="photographer"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              onChange={handlePhotographerChange}
              value={selectedPhotographer}
            >
              <option value="">Select a photographer</option>
              <option value="photographer1">Photographer 1</option>
              <option value="photographer2">Photographer 2</option>
              <option value="photographer3">Photographer 3</option>
            </select>
          </div>
          {selectedPhotographer && (
            <div>
              <label className="block text-grey text-sm font-medium mb-2" htmlFor="photographerPackage">
                Select Photographer Package
              </label>
              <select
                id="photographerPackage"
                className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
              >
                {photographerPackages[selectedPhotographer].map((pkg, index) => (
                  <option key={index} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="event-date">
              Start Date
            </label>
            <input
              type="date"
              id="event-date"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
            />
          </div>
          <div>
            <label className="block text-grey text-sm font-medium mb-2" htmlFor="event-date">
              End Date
            </label>
            <input
              type="date"
              id="event-date"
              className="w-full px-4 py-2 bg-darkgrey text-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-mauve"
            />
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