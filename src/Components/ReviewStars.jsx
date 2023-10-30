import React from "react";
import ReactStars from "react-stars";

// Udviklet fælles i gruppen

export const ReviewStars = (props) => {
  return (
    <div>
      <ReactStars edit={props.edit} count={5} onChange={props.changed} size={props.size} color2={"#ffd700"} value={props.rating} char="★" />
    </div>
  );
};
