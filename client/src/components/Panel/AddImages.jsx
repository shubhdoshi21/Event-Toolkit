import React, { useRef, useState } from "react";

const AddImages = () => {
    const imageRef = useRef(null);
    
  const [imageName, setImageName] = useState("");
    const handleImageClick = () => {
        imageRef.current.click();
      };
    
      const handleImageChange = () => {
        const file = imageRef.current.files[0];
        if (file) {
          setImageName(file.name);
        }
      };
      
    
  return (
    <div>
        <div className="mb-4">
            <label htmlFor="image" className="block text-gray-300 mb-2">
              Add Image to event!
            </label>
            {/* Hidden file input */}
            <input
              type="file"
              id="image"
              ref={imageRef}
              accept="image/*"
              className="hidden" // Hide the default file input
              onChange={handleImageChange} // Handle file input change
            />
            {/* Custom file input button */}
            <button
              type="button"
              onClick={handleImageClick}
              className="w-auto p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
            >
              Choose Image
            </button>
            {/* Display the selected image name */}
            {imageName && (
              <span className="ml-4 text-gray-300">{imageName}</span>
            )}
          </div>

    </div>
  )
}

export default AddImages