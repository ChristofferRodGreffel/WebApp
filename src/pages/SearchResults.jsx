import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import Backbutton from "../Components/Backbutton";
import { CircleLoader } from "react-spinners";
import SearchField from "../Components/SearchField";

// Denne komponent er udviklet fælles i gruppen

// Komponenten tager filmid med fra søgefeltet og henter data fra TMDB api'en.
const SearchResults = () => {
  const { searchParam } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Denne useEffect henter data fra api'en og sætter resultatet i searchResults useState.
  // Den kører når searchParam, hvilket er brugerens søgeord, ændrer sig.
  useEffect(() => {
    const getAllResults = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchParam}&include_adult=false&language=en-US&page=1`, options);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.results);
          setLoading(false);
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllResults();
  }, [searchParam]);

  // Denne funktion fører brugeren videre til overview siden, når der klikkes på et filmkort.
  const handleOpenSearchOverview = (id) => {
    navigate(`/searchoverview/${id}`);
  };

  // Denne funktion bruges til at udfiltrere film uden billede og rating
  // Bliver brugt til at vise mængden af søgeresultater
  const correctedResults = () => {
    const adjustedResults = [];
    searchResults.map((result) => {
      if (result.poster_path && result.vote_average) {
        adjustedResults.push(result);
      }
    });
    return adjustedResults;
  };

  return (
    <div className="search-results">
      <Backbutton />
      <div className="search-intro">
        <h1>Search Results</h1>
        <p>
          You searched for: <b>{searchParam}</b>
          <br />
          {correctedResults()?.length} results found
        </p>
      </div>
      <div className="results-container">
        {loading && (
          <div className="loader">
            <CircleLoader color={"#dadada"} loading={loading} size={100} cssOverride={{}} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        )}
        {searchResults.length !== 0 ? (
          <>
            {searchResults.map((result, key) => {
              if (result.poster_path && result.vote_average) {
                // Resultater uden billede eller rating sorteres fra
                return (
                  <div key={key}>
                    <div className="movie-result">
                      <MovieCard
                        onClick={handleOpenSearchOverview}
                        key={key}
                        id={result.id}
                        url={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        rating={result.vote_average.toPrecision(2)}
                        icon={"fa-solid fa-plus"}
                      />
                      <div className="movie-description">
                        <h3>{result.title}</h3>
                        <p>
                          Released: <b>{result.release_date}</b>
                        </p>
                        <p>
                          Original language: <b>{result.original_language.toUpperCase()}</b>
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </>
        ) : (
          <div className="no-match">
            <p>Nothing matched your search... Try searching for something else.</p>
            <SearchField />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
