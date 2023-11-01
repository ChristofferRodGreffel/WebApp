import React, { useEffect, useState } from "react";
import { staticMovies } from "../staticmovies";
import MovieCard from "../Components/MovieCard";
import HorizontalScroller from "../Components/HorizontalScroller";
import SearchBar from "../Components/SearchBar";
import AddToList from "../Components/AddToList";
import { useNavigate } from "react-router-dom";

// Denne komponent er udviklet fælles i gruppen

const Home = () => {
  // Vi laver en useState til at opbevare den valgte film som objekt
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);

  const navigate = useNavigate();

  // Denne funktion sætter vores useState til den valgte film
  // (funtion gives videre i MovieCard komponenten som onAddClick)
  const handleAddClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Denne funktion fører brugeren videre til overview siden, når der klikkes på et filmkort.
  const handleOpenSearchOverview = (id) => {
    navigate(`/searchoverview/${id}`);
  };

  // Get lists of movies and populate useStates
  useEffect(() => {
    const getPopularMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=2`, options);
        if (response.ok) {
          const data = await response.json();
          setPopularMovies(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    const getUpcomingMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options);
        if (response.ok) {
          const data = await response.json();
          setUpcomingMovies(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    const getTopRatedMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options);
        if (response.ok) {
          const data = await response.json();
          setTopRatedMovies(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPopularMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <>
      <SearchBar />
      <HorizontalScroller
        scrollerTitle="Movies For You"
        content={popularMovies?.results?.map((movie, key) => {
          return (
            <MovieCard
              onClick={handleOpenSearchOverview}
              onAddClick={handleAddClick}
              key={key}
              movie={movie}
              id={movie.id}
              title={movie.title}
              url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              rating={movie.vote_average.toPrecision(2)}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />

      <HorizontalScroller
        scrollerTitle="Upcoming Movies"
        content={upcomingMovies?.results?.map((movie, key) => {
          return (
            <MovieCard
              onClick={handleOpenSearchOverview}
              onAddClick={handleAddClick}
              key={key}
              movie={movie}
              id={movie.id}
              title={movie.title}
              url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              rating={movie.vote_average.toPrecision(2)}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />

      <HorizontalScroller
        scrollerTitle="Top Rated Movies"
        content={topRatedMovies?.results?.map((movie, key) => {
          return (
            <MovieCard
              onClick={handleOpenSearchOverview}
              onAddClick={handleAddClick}
              key={key}
              movie={movie}
              id={movie.id}
              title={movie.title}
              url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              rating={movie.vote_average.toPrecision(2)}
              icon={"fa-solid fa-plus"}
            />
          );
        })}
      />

      {/* SelectedMovie useState videregives til AddToList popup. Denne inderholder nu film-objektet */}
      <AddToList movie={selectedMovie} />
    </>
  );
};

export default Home;
