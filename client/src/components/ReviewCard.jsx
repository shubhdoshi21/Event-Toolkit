import React from "react";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div key={review.id} className="bg-gray-700 rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-bold mb-2">{review.user}</h3>
      <p className="text-yellow-400">
        Rating: {renderStars(review.rating)} ({review.rating}/5)
      </p>
      <p className="text-gray-300 mt-2">{review.content}</p>
    </div>
  );
};

export default ReviewCard;
