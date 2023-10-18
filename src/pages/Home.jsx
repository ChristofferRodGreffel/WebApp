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
        content={staticMovies.movies.map((movie, key) => {
          return (
            <MovieCard
              key={key}
              title={movie.title}
              url={movie.poster_image}
              rating={movie.rating}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />
    </>
  );
};

export default Home;
