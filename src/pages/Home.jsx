import React from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";
import { staticMovies } from "../staticmovies";

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
            <img
              style={{ width: "140px", height: "200px", objectFit: "cover" }}
              src={movie.poster_image}
              key={key}
              alt="movie poster"
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
