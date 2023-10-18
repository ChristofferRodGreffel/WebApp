import React from "react";

function MovieCard(props) {
  return (
    <div>
      <img src={props.url} alt={`${props.title} Movie poster`} />

      <div>
        <i className="fa-solid fa-star"></i>
      </div>
    </div>
  );
}

export default MovieCard;
