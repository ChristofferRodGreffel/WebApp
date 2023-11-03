import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";
import Backbutton from "../Components/Backbutton";
import { ReviewStars } from "../Components/ReviewStars";
import user from "../assets/defaultuser.svg";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import AddToList from "../Components/AddToList";

// Komponenten er udvilket fælles i gruppen

const SearchOverview = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [streamingServices, setStreamingServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(NaN);
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [spoilerVisibility, setSpoilerVisibility] = useState(Array(reviews?.length).fill(false));
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Review handling

  // Henter alle reviews fra firestore og sætter reviews useState.
  const getReviews = async () => {
    setReviews([]);
    const newReviews = [];
    const querySnapshot = await getDocs(collection(db, `reviews/${movieId}/reviews`));
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        newReviews.push(doc.data());
      });
    }
    setReviews(newReviews);
  };

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
      const reviewData = await addDoc(collection(db, `reviews/${movieId}/reviews`), review);
      const reviewId = reviewData.id;

      await updateReviewWithId(reviewId);

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
      const spoilerCheckbox = document.querySelector("#spoiler-checkbox");
      spoilerCheckbox.checked = false;
    } catch (e) {
      console.error("Error adding review: ", e);
    }
  };

  // Her indsættes review id'et til review objektet
  // Dette skal bruges til at slette et review og i en videreudviklet version, redigere reviewet.
  const updateReviewWithId = async (reviewId) => {
    try {
      const reviewRef = doc(db, `reviews/${movieId}/reviews/${reviewId}`);

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
    console.log(review);
    if (review?.id && review?.userName === getAuth()?.currentUser?.displayName) {
      await deleteDoc(doc(db, `reviews/${movieId}/reviews/${review.id}`));
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

  // Når man først går ind på siden indlæses alle reviews, dog først når vi har adgang til movieId
  useEffect(() => {
    if (movieId) {
      getReviews();
    }
  }, [movieId]);
  // End of review handling

  // Henter information om filmen fra TMDB api'en ud fra det filmId som hører til den film brugeren har klikket på.
  // Denne useEffect kører kun når movieId ændrer sig, dvs. når der er klikket på en ny film.
  // Hvis data findes opdaterer vi samtlige useStates.
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
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,similar,recommendations,reviews&language=en-US`, options);
        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);
          getServices(data.id);
          setLoading(false);
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  // Henter data om streaming services. Kaldes i getMovieDetails. Sætter streamingServices useState.
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

  // Konverterer fra minutter til timer og minutter
  const timeConvert = (n) => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  // Finder en trailer i videos objektet i vore API data.
  const trailerVideo = movieDetails.videos?.results?.find((video) => video.type === "Main Trailer" || video.type === "Official Trailer" || video.type === "Trailer");

  // Går ind på en ny film, når man trykker på en lignende film
  const handleOpenSearchOverview = (id) => {
    console.log(id);
    navigate(`/searchoverview/${id}`);
  };

  const movie = {
    title: movieDetails.title,
    id: movieDetails.id,
  };

  const handleOpenAddToList = () => {
    const popup = document.querySelector(".addToList");
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
    popup.style.display = "flex";
  };

  return (
    <div>
      <AddToList movie={movie} />
      {loading ? (
        <div className="loader">
          <CircleLoader color={"#dadada"} loading={loading} size={100} cssOverride={{}} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <>
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
                    <div className="rating tmdb">
                      <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="IMDb logo" />
                      {movieDetails.vote_average > 0 ? <p>{movieDetails.vote_average?.toPrecision(2)}</p> : <p>Not rated</p>}
                    </div>
                    <Link className="trailer" to={trailerVideo && `https://www.youtube.com/watch?v=${trailerVideo.key}`} target="_blank">
                      Trailer
                    </Link>
                  </div>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <div className="runtime-genre-container">
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
                  <p>{timeConvert(movieDetails.runtime)}</p>
                </div>
                <button className="addToList-btn" onClick={handleOpenAddToList}>
                  Add to list <i className="fa-solid fa-plus"></i>
                </button>
                {!streamingServices?.flatrate && !streamingServices?.rent && !streamingServices?.buy && (
                  <div className="services-container">
                    <h2>Where to watch?</h2>
                    <div className="services">
                      <p>We're sorry... We don't have that data yet...</p>
                    </div>
                  </div>
                )}
                {streamingServices?.flatrate && (
                  <>
                    <div className="services-container">
                      <h2>Streaming on</h2>
                      <div className="services">
                        <>
                          {streamingServices?.flatrate?.map((service, key) => {
                            return (
                              <div key={key}>
                                <img src={`https://image.tmdb.org/t/p/original/${service.logo_path}`} alt={`${service.provider_name} icon`} />
                                <p>{service.provider_name}</p>
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  </>
                )}
                {streamingServices?.rent && (
                  <>
                    <div className="services-container">
                      <h2>Rent on</h2>
                      <div className="services">
                        <>
                          {streamingServices?.rent?.map((service, key) => {
                            return (
                              <div key={key}>
                                <img src={`https://image.tmdb.org/t/p/original/${service.logo_path}`} alt={`${service.provider_name} icon`} />
                                <p>{service.provider_name}</p>
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  </>
                )}
                {streamingServices?.buy && (
                  <>
                    <div className="services-container">
                      <h2>Buy on</h2>
                      <div className="services">
                        <>
                          {streamingServices?.buy?.map((service, key) => {
                            return (
                              <div key={key}>
                                <img src={`https://image.tmdb.org/t/p/original/${service.logo_path}`} alt={`${service.provider_name} icon`} />
                                <p>{service.provider_name}</p>
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  </>
                )}

                <div className="language">
                  <h2>Languages </h2>
                  <ul>
                    {movieDetails?.spoken_languages?.map((lang, key) => {
                      return <li key={key}>{lang.english_name}</li>;
                    })}
                  </ul>
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
                        <textarea name="reviewInput" id="reviewInput" placeholder="What did you think of the movie?" required value={userReview} onChange={(e) => setUserReview(e.target.value)} />
                        <div>
                          <input type="checkbox" id="spoiler-checkbox" className="checkbox" value={containsSpoilers} onChange={(e) => setContainsSpoilers(e.target.checked)} />
                          <label htmlFor="spoiler-checkbox">Contains spoilers</label>
                        </div>

                        <input type="submit" value="Submit review" className="submitButton" />
                      </form>
                    </div>
                    <div className="reviews-container">
                      <div className="justWatch-reviews">
                        <h2>WatchBuddy Reviews</h2>
                        <hr />
                        {reviews.length > 0 ? (
                          <>
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
                                    {review.spoilers && !spoilerVisibility[key] ? <p className="spoiler">Warning: contains spoilers</p> : <p className="review-content">{review.userReview}</p>}
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
                                  <p className="review-content">{review.userReview}</p>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <p className="no-reviews">Be the first to review this movie on WatchBuddy!</p>
                        )}
                      </div>
                      {movieDetails.reviews?.results?.length > 0 && (
                        <div className="tmdb-reviews">
                          <h2>TMDB Reviews</h2>
                          <hr />
                          <div className="tmdb-reviews-container">
                            {movieDetails.reviews.results.map((review, key) => {
                              if (review.content.length < 800 && review.author_details.rating) {
                                return (
                                  <div className="user-review" key={key}>
                                    <div className="review-title">
                                      <h3>{review.author}</h3>
                                    </div>
                                    <div className="rating tmdb">
                                      <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="IMDb logo" />
                                      <p>
                                        <b>{review.author_details.rating?.toPrecision(2)}</b>
                                      </p>
                                    </div>
                                    <p className="review-content">{review.content}</p>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {movieDetails.recommendations?.results?.length != 0 && (
              <>
                <div className="movie-recommended">
                  <HorizontalScroller
                    scrollerTitle="Recommendations"
                    content={movieDetails.recommendations?.results?.map((movie, key) => {
                      if (movie.poster_path && movie.vote_average) {
                        return (
                          <MovieCard
                            onClick={handleOpenSearchOverview}
                            key={key}
                            id={movie.id}
                            title={movie.title}
                            url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            rating={movie.vote_average.toPrecision(2)}
                            icon={"fa-solid fa-plus"}
                          />
                        );
                      }
                    })}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchOverview;
