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
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

// Denne komponent er ligesom SearchOverview, men benytter lokal JSON data, i stedet for API.
// Vi forventer at fjerne denne komponent når API'en er 100% implementeret i app'en.

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
  const { imdbid, searchParam } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(NaN);
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [spoilerVisibility, setSpoilerVisibility] = useState(Array(reviews?.length).fill(false));

  // Henter alle reviews fra firestore og sætter reviews useState.
  const getReviews = async () => {
    setReviews([]);
    const newReviews = [];
    const querySnapshot = await getDocs(collection(db, `reviews/${imdbid}/reviews`));
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        newReviews.push(doc.data());
      });
    }
    setReviews(newReviews);
  };

  useEffect(() => {
    getReviews();
  }, [imdbid]);

  // Toggler visibilitet af review ud fra index paramteren
  const handleShowReview = (index) => {
    setSpoilerVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  // Her laves et review objekt, som sendes videre til addReview funktionen.
  const handleAddReview = (e) => {
    e.preventDefault();
    const currentUser = getAuth().currentUser.displayName;
    const newReview = {
      userReview: userReview,
      userName: currentUser,
      spoilers: containsSpoilers,
      rating: userRating,
    };
    addReview(newReview);
  };

  // Her tilføjes review objektet til firestore med addDoc.
  // Samtidig opdateres reviewet med sit eget id gennem updateReviewWithId funktionen
  const addReview = async (review) => {
    try {
      const reviewData = await addDoc(collection(db, `reviews/${imdbid}/reviews`), review);
      const reviewId = reviewData.id;

      updateReviewWithId(reviewId);

      getReviews();

      toast.success(`review added succesfully`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      setUserRating(NaN);
      setUserReview("");
      setContainsSpoilers(false);
    } catch (e) {
      console.error("Error adding review: ", e);
    }
  };

  // Her indsættes review id'et til review objektet
  // Dette skal bruges til at slette et review og i en videreudviklet version, redigere reviewet.
  const updateReviewWithId = async (reviewId) => {
    try {
      const reviewRef = doc(db, `reviews/${imdbid}/reviews/${reviewId}`);

      await updateDoc(reviewRef, {
        id: reviewId,
      });
    } catch (e) {
      console.error("Error adding id: ", e);
    }
  };

  // Bruges til at opdatere userRating state, så vi adgang til den.
  const ratingChanged = (newRating) => {
    setUserRating(newRating);
  };

  // Bruges til at slette en anmeldelse. Kører getReviews bagefter.
  // En anmeldelse kan kun slettes hvis den findes og brugeren selv har lavet den.
  const handleDeleteReview = async (review) => {
    if (review?.id && review?.userName === getAuth().currentUser.displayName) {
      await deleteDoc(doc(db, `reviews/${imdbid}/reviews/${review.id}`));
      toast.success(`Review removed succesfully`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      getReviews();
    } else {
      toast.error(`Review couldn't be deleted`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Herunder bruger vi data staticMovies til at vise indhold på siden.
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
                      <h3>Did you like the movie?</h3>
                      <div>
                        <form onSubmit={handleAddReview}>
                          <ReviewStars size={35} changed={ratingChanged} rating={userRating} />
                          <textarea name="reviewInput" id="reviewInput" placeholder="What did you think of the movie?" value={userReview} onChange={(e) => setUserReview(e.target.value)} />
                          <div>
                            <input type="checkbox" id="spoiler-checkbox" className="checkbox" value={containsSpoilers} onChange={(e) => setContainsSpoilers(e.target.value)} />
                            <label htmlFor="spoiler-checkbox">Contains spoilers</label>
                          </div>

                          <input type="submit" value="Submit review" className="submitButton" />
                        </form>
                      </div>
                      <div className="reviews-container">
                        {reviews?.map((review, key) => {
                          return review.spoilers ? (
                            <div className="user-review" key={key}>
                              <div className="review-title">
                                {review.userName === getAuth().currentUser.displayName ? (
                                  <>
                                    <h3>{review.userName}</h3>
                                    <p onClick={() => handleDeleteReview(review)}>Delete</p>
                                  </>
                                ) : (
                                  <h3>{review.userName}</h3>
                                )}
                              </div>
                              <ReviewStars size={30} rating={review.rating} edit={false} />
                              <div className="spoiler-warning">
                                {review.spoilers && !spoilerVisibility[key] ? <p className="spoiler">Warning: contains spoilers</p> : <p>{review.userReview}</p>}
                                <button onClick={() => handleShowReview(key)}>
                                  {!spoilerVisibility[key] ? "Read review" : "Hide review"} <i className={`fa-solid fa-angle-${spoilerVisibility[key] ? "up" : "down"}`}></i>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="user-review" key={key}>
                              <div className="review-title">
                                {review.userName === getAuth().currentUser.displayName ? (
                                  <>
                                    <h3>{review.userName}</h3>
                                    <p onClick={() => handleDeleteReview(review)}>Delete</p>
                                  </>
                                ) : (
                                  <h3>{review.userName}</h3>
                                )}
                              </div>
                              <ReviewStars size={30} rating={review.rating} edit={false} />
                              <p>{review.userReview}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="movie-recommended">
                <HorizontalScroller
                  scrollerTitle="More like this"
                  content={staticMovies.movies.map((movie, key) => {
                    if (key <= 10) {
                      return <MovieCard key={key} id={movie.imdb_id} title={movie.title} url={movie.poster_image} rating={movie.rating.toPrecision(2)} icon={"fa-solid fa-plus"} />;
                    }
                  })}
                />
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default SingleMovieOverview;
