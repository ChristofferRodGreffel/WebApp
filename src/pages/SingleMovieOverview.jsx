import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { staticMovies } from "../staticmovies";
import { movieDataJS } from "../exampleResponse";
import imdb from "../assets/imdb.svg";

function SingleMovieOverview() {
  const { imdbid } = useParams();

  //   const [movieData, setMovieData] = useState();

  // Denne skal bruges når vi er ved at være færdige (OBS 100 kald dagligt)

  // useEffect(() => {
  //     const getStreamingData = async () => {
  //         const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${imdbid}`;
  //         const options = {
  //             method: "GET",
  //             headers: {
  //                 "X-RapidAPI-Key": "0483b93bf4msh60c54eb3f79171dp13500ajsn06d4c55a084d",
  //                 "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  //             },
  //         };

  //         try {
  //             const response = await fetch(url, options);
  //             const resultJsonData = await response.json();

  //             setMovieData(resultJsonData)
  //         } catch (error) {
  //             alert(error)
  //             console.error(error);
  //         }
  //     };
  //     getStreamingData()
  // }, []);

  return (
    <>
      {staticMovies.movies.map((movie) => {
        if (movie.imdb_id === imdbid) {
          return (
            <div key={movie.imdb_id}>
              <img className="poster-image" src={movie.cover_image} alt={`${movie.title} cover image`} />

              <div className="movie-container">
                <div className="overview">
                  <h1>{movie.title}</h1>
                  <div className="first-line">
                    <div className="first-line-left">
                      <div className="rating">
                        <img src={imdb} alt="IMDb logo" />
                        <p>{movie.rating.toPrecision(2)}</p>
                      </div>
                      <Link className="trailer" to={movie.trailer} target="_blank">
                        Trailer
                      </Link>
                    </div>
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <div className="runtime-genre-container">
                    <p>{movie.runtime}</p>
                    <div className="dots-list">
                      {movie.genres.map((genre, key) => {
                        if (movie.genres.length == key + 1) {
                          return <p key={key}>{genre}</p>;
                        } else {
                          return (
                            <p key={key}>
                              {genre}&nbsp; <i className="fa-solid fa-circle"></i> &nbsp;
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <button className="addToList-btn">
                    Add to list <i className="fa-solid fa-plus"></i>
                  </button>
                  <div className="services">
                    <h2>Available on</h2>
                    <div className="dots-list">
                      {movie.service.map((service, key) => {
                        if (movie.service.length == 1) {
                          return <p key={key}>{service}</p>;
                        } else if (movie.service.length == key + 1) {
                          return <p key={key}>{service}</p>;
                        } else {
                          return (
                            <p key={key}>
                              {service}&nbsp; <i className="fa-solid fa-circle"></i> &nbsp;
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default SingleMovieOverview;
