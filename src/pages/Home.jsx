import React, { useState } from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";
import { staticMovies } from "../staticmovies";
import MovieCard from "../Components/MovieCard";
import HorizontalScroller from "../Components/HorizontalScroller";
import SearchBar from "../Components/SearchBar";
import AddToList from "../Components/AddToList";
import { FIREBASE_AUTH } from "../../firebase-config";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleAddClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSignOut = () => {
    CustomSignOut();
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

      <AddToList movie={selectedMovie} />
    </>
  );
};

export default Home;
