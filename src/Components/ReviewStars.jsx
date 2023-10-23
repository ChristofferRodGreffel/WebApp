import React from "react";
import ReactStars from "react-stars";

export const ReviewStars = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div>
      <ReactStars count={5} onChange={ratingChanged} size={35} color2={"#ffd700"} />
    </div>
  );
};
