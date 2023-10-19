import React from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";
import { staticMovies } from "../staticmovies";
import MovieCard from "../Components/MovieCard";
import HorizontalScroller from "../Components/HorizontalScroller";

const Home = () => {
  const handleSignOut = () => {
    CustomSignOut();
  };

  return (
    <>
      <button onClick={handleSignOut}>Sign out</button>
      <HorizontalScroller
        scrollerTitle="Movies for you"
        content={staticMovies.movies.map((movie, key) => {
          if (key <= 4) {
            return <MovieCard key={key} id={movie.imdb_id} title={movie.title} url={movie.poster_image} rating={movie.rating.toPrecision(2)} icon={"fa-solid fa-plus"} />;
          }
        })}
      />

      <HorizontalScroller
        scrollerTitle="Popular"
        content={staticMovies.movies.map((movie, key) => {
          if (key > 5 && key <= 10) {
            return <MovieCard key={key} id={movie.imdb_id} title={movie.title} url={movie.poster_image} rating={movie.rating.toPrecision(2)} icon={"fa-solid fa-plus"} />;
          }
        })}
      />

      <HorizontalScroller
        scrollerTitle="Your friends like"
        content={staticMovies.movies.map((movie, key) => {
          if (key > 10) {
            return <MovieCard key={key} id={movie.imdb_id} title={movie.title} url={movie.poster_image} rating={movie.rating.toPrecision(2)} icon={"fa-solid fa-plus"} />;
          }
        })}
      />
    </>
  );
};

export default Home;
