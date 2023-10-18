import React from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";
import { staticMovies } from "../staticmovies";
import MovieCard from "../Components/MovieCard";

const Home = () => {
  const handleSignOut = () => {
    CustomSignOut();
  };

  return (
    <>
      <div>Home</div>
      <button onClick={handleSignOut}>Sign out</button>
      <div>
        {staticMovies.movies.map((movie, key) => {
          return (
            <MovieCard title={movie.title} url={movie.poster_image} rating={movie.rating} icon={"fa-solid fa-plus"} />
          );
        })}
      </div>
    </>
  );
};

export default Home;
