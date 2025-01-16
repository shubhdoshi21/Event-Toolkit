import React from 'react';

const Search = ({
  searchQuery,
  searchResults,
  dispatchFunction,
  variable,
  toDisplay,
}) => {
  return (
    <>
      {searchQuery && (
        <div className="w-full bg-lightgrey text-black shadow-lg p-2 z-10 border-l-2 border-r-2 border-b-2 border-pupll">
          <h3 className="font-bold text-gray-700 mb-2">{variable}</h3>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((venue, index) => ( 
                <li
                  key={index}
                  className="py-1 px-2 hover:bg-gray-200 rounded cursor-pointer"
                  onClick={() => dispatchFunction(venue)}
                >
                  {venue[toDisplay]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm px-2">No results found</p>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
