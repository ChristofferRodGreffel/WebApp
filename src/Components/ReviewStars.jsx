import React from "react";
import ReactStars from "react-stars";

export const ReviewStars = (props) => {
  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };

  return (
    <div>
      <ReactStars edit={props.edit} count={5} onChange={props.changed} size={props.size} color2={"#ffd700"} value={props.rating} />
    </div>
  );
};
