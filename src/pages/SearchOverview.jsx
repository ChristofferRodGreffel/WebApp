import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";
import Backbutton from "../Components/Backbutton";
import { ReviewStars } from "../Components/ReviewStars";
import imdb from "../assets/imdb.svg";
import user from "../assets/defaultuser.svg";
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config";

const SearchOverview = () => {
  const { searchParam } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [imdbId, setImdbId] = useState("");
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

  useEffect(() => {
    getReviews();
  }, [searchParam]);

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
  // End of review handling

  useEffect(() => {
    const getMovieImdb = async () => {
      setSearchResults([]);
      const url = `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${searchParam}/`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "0483b93bf4msh60c54eb3f79171dp13500ajsn06d4c55a084d",
          "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.results[0].imdb_id);
        getMovieDetails(result.results[0].imdb_id);
        setImdbId(result.results[0].imdb_id);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieImdb();

    const getMovieDetails = async (imdbId) => {
      const url = `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${imdbId}&currentCountry=US`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "0483b93bf4msh60c54eb3f79171dp13500ajsn06d4c55a084d",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      const newResult = [];

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        newResult.push(result);
      } catch (error) {
        console.error(error);
      }
      setSearchResults(newResult);
    };
  }, []);
  console.log(searchResults);

  const timeConvert = (n) => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " t " + rminutes + " m ";
  };

  return (
    <div>
      <Backbutton />
      {searchResults.map((movie, key) => {
        return (
          <div key={key}>
            <img className="poster-image" src={movie.title.image.url} alt={`${movie.title.title} cover image`} />

            <div className="movie-container">
              <div className="overview">
                <h1>{movie.title.title}</h1>
                <div className="first-line">
                  <div className="first-line-left">
                    <div className="rating">
                      <img src={imdb} alt="IMDb logo" />
                      <p>{movie.ratings.rating.toPrecision(2)}</p>
                    </div>
                    <Link className="trailer" to={"no url"} target="_blank">
                      Trailer
                    </Link>
                  </div>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <div className="runtime-genre-container">
                  <p>{timeConvert(movie.title.runningTimeInMinutes)}</p>
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
                    {/* {movie.service.map((service, key) => {
                      return (
                        <div key={key}>
                          <img src={serviceIcons[service]} alt={`${service} icon`} />
                          <p>{service}</p>
                        </div>
                      );
                    })} */}
                  </div>
                </div>
                {/* <div className="language">
                  <h2>Languages </h2>
                  <p>{movie.language}</p>
                </div> */}
                <div className="movie-about">
                  <h2>About the movie</h2>
                  <p>{movie.plotOutline.text}</p>
                  <Link to={`https://www.imdb.com/${movie.id}`} target="_blank">
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
                        <textarea
                          name="reviewInput"
                          id="reviewInput"
                          placeholder="What did you think of the movie?"
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                        />
                        <div>
                          <input
                            type="checkbox"
                            id="spoiler-checkbox"
                            className="checkbox"
                            value={containsSpoilers}
                            onChange={(e) => setContainsSpoilers(e.target.value)}
                          />
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
                              {review.spoilers && !spoilerVisibility[key] ? (
                                <p className="spoiler">Warning: contains spoilers</p>
                              ) : (
                                <p>{review.userReview}</p>
                              )}
                              <button onClick={() => handleShowReview(key)}>
                                {!spoilerVisibility[key] ? "Read review" : "Hide review"}{" "}
                                <i className={`fa-solid fa-angle-${spoilerVisibility[key] ? "up" : "down"}`}></i>
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
            {/* <div className="movie-recommended">
                <HorizontalScroller
                  scrollerTitle="More like this"
                  content={staticMovies.movies.map((movie, key) => {
                    if (key <= 10) {
                      return (
                        <MovieCard
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
              </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default SearchOverview;
