import React, { useState } from "react";
import { staticMovies } from "../staticmovies";
import MovieCard from "../Components/MovieCard";
import HorizontalScroller from "../Components/HorizontalScroller";
import SearchBar from "../Components/SearchBar";
import AddToList from "../Components/AddToList";

// Denne komponent er udviklet fælles i gruppen

const Home = () => {
  // Vi laver en useState til at opbevare den valgte film som objekt
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Denne funktion sætter vores useState til den valgte film
  // (funtion gives videre i MovieCard komponenten som onAddClick)
  const handleAddClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <SearchBar />
      <HorizontalScroller
        scrollerTitle="Movies for you"
        content={staticMovies.movies.map((movie, key) => {
          if (key <= 5) {
            return (
              <MovieCard
                onAddClick={handleAddClick} // funktion til at opdatere selectedMovie useState.
                movie={movie} // Vi giver movie objektet med videre til MovieCard komponenten
                key={key}
                id={movie.imdb_id}
                title={movie.title}
                url={movie.poster_image}
                rating={movie.rating.toPrecision(2)}
                icon={"fa-solid fa-plus"}
              />
            );
          }
        })}
      />

      <HorizontalScroller
        scrollerTitle="Popular"
        content={staticMovies.movies.map((movie, key) => {
          if (key > 5 && key <= 10) {
            return (
              <MovieCard
                onAddClick={handleAddClick}
                movie={movie}
                key={key}
                id={movie.imdb_id}
                title={movie.title}
                url={movie.poster_image}
                rating={movie.rating.toPrecision(2)}
                icon={"fa-solid fa-plus"}
              />
            );
          }
        })}
      />

      <HorizontalScroller
        scrollerTitle="Your friends like"
        content={staticMovies.movies.map((movie, key) => {
          if (key > 10) {
            return (
              <MovieCard
                onAddClick={handleAddClick}
                movie={movie}
                key={key}
                id={movie.imdb_id}
                title={movie.title}
                url={movie.poster_image}
                rating={movie.rating.toPrecision(2)}
                icon={"fa-solid fa-plus"}
              />
            );
          }
        })}
      />

      {/* SelectedMovie useState videregives til AddToList popup. Denne inderholder nu film-objektet */}
      <AddToList movie={selectedMovie} />
    </>
  );
};

export default Home;
