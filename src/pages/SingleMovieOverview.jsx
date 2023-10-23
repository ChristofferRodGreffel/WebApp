import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { staticMovies } from "../staticmovies";
import imdb from "../assets/imdb.svg";
import netflixIcon from "../assets/icons/netflix.svg";
import hboIcon from "../assets/icons/hbo.svg";
import disneyIcon from "../assets/icons/disney.svg";
import viaplayIcon from "../assets/icons/viaplay.svg";
import primeIcon from "../assets/icons/prime.svg";
import appleIcon from "../assets/icons/appletv.svg";
import tv2Icon from "../assets/icons/tv2play.svg";
import filmstribenIcon from "../assets/icons/filmstriben.png";
import { services } from "../staticmovies";
import Backbutton from "../Components/Backbutton";
import user from "../assets/defaultuser.svg";
import ReactStars from "react-stars";
import { ReviewStars } from "../Components/ReviewStars";

const serviceIcons = {
  [services.netflix]: netflixIcon,
  [services.hbo]: hboIcon,
  [services.disney]: disneyIcon,
  [services.viaplay]: viaplayIcon,
  [services.prime]: primeIcon,
  [services.apple]: appleIcon,
  [services.tv2]: tv2Icon,
  [services.filmstriben]: filmstribenIcon,
};

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
      <Backbutton />
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
                    <div className="dots-list services">
                      {movie.service.map((service, key) => {
                        return (
                          <div key={key}>
                            <img src={serviceIcons[service]} alt={`${service} icon`} />
                            <p>{service}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="language">
                    <h2>Languages </h2>
                    <p>{movie.language}</p>
                  </div>
                  <div className="movie-about">
                    <h2>About the movie</h2>
                    <p>{movie.description}</p>
                    <Link to={`https://www.imdb.com/title/${movie.imdb_id}/`} target="_blank">
                      Read more on IMDb
                    </Link>
                  </div>
                  <div className="friendsSection">
                    <h2>Friends who loved it</h2>
                    <div>
                      <div>
                        <img src={user} alt="Placeholder for user" />
                        <p>richguy2020</p>
                      </div>
                      <div>
                        <img src={user} alt="Placeholder for user" />
                        <p>flowergirl25</p>
                      </div>
                      <div>
                        <img src={user} alt="Placeholder for user" />
                        <p>peterparker</p>
                      </div>
                    </div>
                  </div>
                  <div className="reviews">
                    <h2>Reviews</h2>
                    <div>
                      <h3>How did you like the movie?</h3>
                      <div>
                        <form>
                          <ReviewStars />
                          <textarea name="reviewInput" id="reviewInput" cols="42" rows="9"></textarea>

                          <input type="checkbox" />
                          <p>Contains spoilers</p>

                          <input type="submit" value="Submit review" />
                        </form>
                      </div>
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
