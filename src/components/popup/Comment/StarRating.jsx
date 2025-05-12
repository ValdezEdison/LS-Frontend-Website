import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#F4C031" : "#d5d5d6",
            fontSize: "30px"
          }}
          onClick={() => onRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;