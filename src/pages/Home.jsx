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
      <div>Home</div>
      <button onClick={handleSignOut}>Sign out</button>
      <HorizontalScroller
        scrollerTitle="All movies"
        content={staticMovies.movies.map((movie, key) => {
          return (
            <MovieCard
              key={key}
              id={movie.imdb_id}
              title={movie.title}
              url={movie.poster_image}
              rating={movie.rating.toPrecision(2)}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />

      <HorizontalScroller
        scrollerTitle="All movies"
        content={staticMovies.movies.map((movie, key) => {
          return (
            <MovieCard
              key={key}
              id={movie.imdb_id}
              title={movie.title}
              url={movie.poster_image}
              rating={movie.rating.toPrecision(2)}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />

      <HorizontalScroller
        scrollerTitle="All movies"
        content={staticMovies.movies.map((movie, key) => {
          return (
            <MovieCard
              key={key}
              id={movie.imdb_id}
              title={movie.title}
              url={movie.poster_image}
              rating={movie.rating.toPrecision(2)}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />
    </>
  );
};

export default Home;
