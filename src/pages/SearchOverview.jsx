import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";
import Backbutton from "../Components/Backbutton";
import { ReviewStars } from "../Components/ReviewStars";
import imdb from "../assets/imdb.svg";
import user from "../assets/defaultuser.svg";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";

const SearchOverview = () => {
  const { movieId } = useParams();
  const [imdbId, setImdbId] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [streamingServices, setStreamingServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(NaN);
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [spoilerVisibility, setSpoilerVisibility] = useState(Array(reviews?.length).fill(false));

  // Review handling
  const getReviews = async () => {
    setReviews([]);
    const newReviews = [];
    const querySnapshot = await getDocs(collection(db, `reviews/${imdbId}/reviews`));
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        newReviews.push(doc.data());
      });
    }
    setReviews(newReviews);
  };

  const handleShowReview = (index) => {
    setSpoilerVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

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

  const addReview = async (review) => {
    try {
      const reviewData = await addDoc(collection(db, `reviews/${imdbId}/reviews`), review);
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

  const updateReviewWithId = async (reviewId) => {
    try {
      const reviewRef = doc(db, `reviews/${imdbId}/reviews/${reviewId}`);

      await updateDoc(reviewRef, {
        id: reviewId,
      });
    } catch (e) {
      console.error("Error adding id: ", e);
    }
  };

  const ratingChanged = (newRating) => {
    setUserRating(newRating);
  };

  const handleDeleteReview = async (review) => {
    if (review?.id && review?.userName === getAuth().currentUser.displayName) {
      await deleteDoc(doc(db, `reviews/${imdbId}/reviews/${review.id}`));
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

  useEffect(() => {
    if (imdbId) {
      getReviews();
    }
  }, [imdbId]);
  // End of review handling

  useEffect(() => {
    const getMovieDetails = async () => {
      setMovieDetails([]);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos&language=en-US`, options);
        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);
          getServices(data.id);
          setImdbId(data.imdb_id);
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getMovieDetails();
  }, []);

  const getServices = async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
      },
    };

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, options);
      if (response.ok) {
        const data = await response.json();
        setStreamingServices(data.results.DK);
      } else {
        console.error("Error fetching data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const timeConvert = (n) => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  const trailerVideo = movieDetails.videos?.results?.find((video) => video.type === "Main Trailer" || video.type === "Official Trailer" || video.type === "Trailer");

  return (
    <div>
      <Backbutton />
      <div>
        <img
          className="poster-image"
          src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}` : `https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path}`}
          alt={`${movieDetails.title} cover image`}
        />

        <div className="movie-container">
          <div className="overview">
            <h1>{movieDetails.title}</h1>
            <div className="first-line">
              <div className="first-line-left">
                <div className="rating">
                  <img src={imdb} alt="IMDb logo" />
                  <p>{movieDetails.vote_average?.toPrecision(2)}</p>
                </div>
                <Link className="trailer" to={trailerVideo ? `https://www.youtube.com/watch?v=${trailerVideo.key}` : ""} target="_blank">
                  Trailer
                </Link>
              </div>
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="runtime-genre-container">
              <p>{timeConvert(movieDetails.runtime)}</p>
              <div className="dots-list">
                {movieDetails?.genres?.map((genre, key) => {
                  if (movieDetails.genres.length == key + 1) {
                    return <p key={key}>{genre.name}</p>;
                  } else {
                    return (
                      <p key={key}>
                        {genre.name}&nbsp; <i className="fa-solid fa-circle"></i> &nbsp;
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
                {streamingServices?.flatrate?.map((service, key) => {
                  return (
                    <div key={key}>
                      <img src={`https://image.tmdb.org/t/p/original/${service.logo_path}`} alt={`${service.provider_name} icon`} />
                      <p>{service.provider_name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="language">
              <h2>Languages </h2>
              <div>
                {movieDetails?.spoken_languages?.map((lang, key) => {
                  return <p key={key}>{lang.english_name}</p>;
                })}
              </div>
            </div>
            <div className="movie-about">
              <h2>About the movie</h2>
              <p>{movieDetails.overview}</p>
              <Link to={`https://www.imdb.com/title/${movieDetails.imdb_id}/`} target="_blank">
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
      </div>
    </div>
  );
};

export default SearchOverview;
