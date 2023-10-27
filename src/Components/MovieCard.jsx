import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";

// Komponenten er udviklet fælles i gruppen

// This component is a single "moviecard"

function MovieCard(props, { key }) {
  const navigate = useNavigate();
  const { imdbid } = useParams();

  const handleOnCardClick = () => {
    if (imdbid !== props.id) {
      navigate(`/overview/${props.id}`);
    }
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    props.onAddClick(props.movie); // onAddClick er videregivet fra Home.jsx, funktion ligger der.
    const popup = document.querySelector(".addToList");
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
    popup.style.display = "flex";
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    const listRef = doc(db, "lists", props.listId);

    await updateDoc(listRef, {
      movies: arrayRemove(props.id),
    });

    props.getLists();

    toast.success(`${props.title} removed from list`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div onClick={handleOnCardClick} className="moviecardWrapper media-element" data-id={props.id} key={key}>
      <div>
        <img src={props.url} alt={`${props.title} Movie poster`} />

        <div className="moviecardRatingContainer">
          <i className="fa-solid fa-star"></i>
          <p>{props.rating}</p>
        </div>

        <div className={props.remove ? "moviecardRemove" : "moviecardAdd"} onClick={props.remove ? handleRemove : handleOpen}>
          <i className={props.icon}></i>
        </div>
      </div>

      <p>{props.title}</p>
    </div>
  );
}

export default MovieCard;
