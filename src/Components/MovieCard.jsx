import React from "react";
import { useNavigate } from "react-router-dom";

// Komponenten er udviklet fælles i gruppen

// This component is a single "moviecard"

function MovieCard(props, { key }) {

  const navigate = useNavigate();

  const handleOnCardClick = () => {
    navigate(`/overview/${props.id}`);
  }

  return (
    <div onClick={handleOnCardClick} className="moviecardWrapper media-element" data-id={props.id} key={key}>
      <div>
        <img src={props.url} alt={`${props.title} Movie poster`} />

        <div className="moviecardRatingContainer">
          <i className="fa-solid fa-star"></i>
          <p>{props.rating}</p>
        </div>

        <div className="moviecardAdd">
          <i className={props.icon}></i>
        </div>
      </div>

      <p>{props.title}</p>
    </div>
  );
}

export default MovieCard;
