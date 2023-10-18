import React from "react";

function MovieCard(props) {
  return (
    <div>
      <img src={props.url} alt={`${props.title} Movie poster`} />

      <div></div>
    </div>
  );
}

export default MovieCard;
