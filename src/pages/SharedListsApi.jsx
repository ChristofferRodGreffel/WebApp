import React, { useEffect, useState } from "react";
import AddListBtn from "../Components/AddListBtn";
import CreateNewList from "../Components/CreateNewList";
import { arrayRemove, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// Denne komponent er udviklet fælles i gruppen

const SharedListsApi = () => {
  const [myLists, setMyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allApiMovies, setAllApiMovies] = useState(null);

  const navigate = useNavigate();

  const userName = FIREBASE_AUTH.currentUser?.displayName;

  const handleAddList = (e) => {
    e.stopPropagation();
    const popup = document.querySelector(".createNewList");
    popup.style.display = "flex";
  };

  const getAllLists = async () => {
    const newLists = [];
    const iHaveAccessTo = [];

    if (!userName) {
      return;
    }

    // Følgende linjer henter de list id'er, som "userName" har adgang til og ligger
    // dem i variablen "iHaveAccessTo"
    const docRef = doc(db, "users", userName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docSnapData = docSnap.data()?.listsAccess;
      docSnapData?.forEach((id) => {
        iHaveAccessTo.push(id);
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such id!");
    }

    // Følgende linjer henter alle lister, som ligger i vores Firestore
    // ... også dem, man ikke har adgang til
    const querySnapshot = await getDocs(collection(db, "lists"));
    // Følgende linjer tjekker for hver enkelt liste,
    // om listen findes i den array som findes i "iHaveAccessTo"
    // ... hvis den findes, så tilføjes listen til variablen "newLists"
    if (querySnapshot) {
      querySnapshot.forEach((list) => {
        if (iHaveAccessTo.includes(list.id)) {
          if (list.data()?.sharedWith.length != 0) {
            newLists.push(list.data());
          }
        }
      });
    }
    // Efter at have tilføjet alle de lister, man har adgang til "newLists"
    // sætter den "newLists" til vores useState "myLists, setMyLists"
    setMyLists(newLists);
    setLoading(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovies = [];
      for (const list of myLists) {
        for (const id of list.movies) {
          await getMovieDetails(id, newMovies);
        }
      }
      setAllApiMovies(newMovies);
    };

    fetchMovies();
  }, [myLists]);

  const getMovieDetails = async (movieId, newMovies) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWJkODllZTQ1YjUwZmRlYWViMTRkYzZmYTI0YjY4YSIsInN1YiI6IjY1M2QwNmUxZTg5NGE2MDBhZDU2OTQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CawKufvwC1jeUhbpNGSH0HW_UMxvOHXzXM2LgfODtIY",
      },
    };

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,similar&language=en-US`, options);
      if (response.ok) {
        const data = await response.json();
        newMovies.push(data);
        setLoading(false);
      } else {
        console.error("Error fetching data");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Kører funktionen "getAllLists", når brugeren er godkendt og data er lagt i vores useState.
    if (userName) {
      getAllLists();
    }
  }, [userName]);

  const handleDeleteList = async (list) => {
    const userRef = doc(db, "users", userName);

    // Sletter listen fra "lists" kollektionen i firestore
    await deleteDoc(doc(db, "lists", list.listDocId));

    // Sletter listen fra "listsAccess" kollektionen i firestore
    await updateDoc(userRef, {
      listsAccess: arrayRemove(list.listDocId),
    });

    // Sletter listen fra "listAccess" ved de brugere listen er delt med
    list.sharedWith.forEach(async (user) => {
      let sharedUserRef = doc(db, "users", user);
      await updateDoc(sharedUserRef, {
        listsAccess: arrayRemove(list.listDocId),
      });
    });

    toast.success(`${list.listName} removed succesfully`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    getAllLists();
  };

  // Sletter brugerens adgang til listen, ved at opdatere listAccess
  const handleLeaveList = async (list) => {
    const userRef = doc(db, "users", userName);
    const listRef = doc(db, "lists", list.listDocId);

    // Sletter listen fra "listsAccess" kollektionen i firestore
    await updateDoc(userRef, {
      listsAccess: arrayRemove(list.listDocId),
    });

    // Sletter brugeren fra sharedWith under listen i firestore
    await updateDoc(listRef, {
      sharedWith: arrayRemove(userName),
    });

    toast.success(`${list.listName} removed succesfully`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    getAllLists();
  };

  // Denne funktion fører brugeren videre til overview siden, når der klikkes på et filmkort.
  const handleOpenSearchOverview = (id) => {
    navigate(`/searchoverview/${id}`);
  };

  return (
    <div className="my-lists">
      {/* CreateNewList komponenten har fået en props, som er den funktion, getAllLists(), der henter de lister */}
      {/* man har adgang til */}
      <CreateNewList onUpdate={getAllLists} />
      <div className="my-lists-menu">
        <h1>Shared lists</h1>
        <AddListBtn function={handleAddList} />
      </div>
      <div className="all-lists">
        {loading ? (
          <div className="loader">
            <CircleLoader color={"#dadada"} loading={loading} size={100} cssOverride={{}} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        ) : (
          <>
            {myLists.length != 0 ? (
              <>
                {/* First we map myList, which returns each list the user has access to */}
                {myLists.map((list, key) => {
                  if (list.movies.length != 0) {
                    return (
                      // Then we return the HorizontalScroller component and pass the listName and
                      // content, which in this case is all of the imdb id's of the list.
                      <div className="scroller-container" key={key}>
                        <HorizontalScroller
                          handleDeleteList={handleDeleteList}
                          handleLeaveList={handleLeaveList}
                          list={list}
                          delete="Delete list"
                          edit="Edit list"
                          scrollerTitle={list.listName}
                          content={list.movies.map((id) => {
                            return allApiMovies?.map((movie, key) => {
                              if (movie.id === id) {
                                return (
                                  <MovieCard
                                    getLists={getAllLists}
                                    listId={list.listDocId}
                                    onClick={handleOpenSearchOverview}
                                    remove={true}
                                    key={key}
                                    id={movie.id}
                                    title={movie.title}
                                    url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    rating={movie.vote_average?.toPrecision(2)}
                                    icon={"fa-solid fa-xmark"}
                                  />
                                );
                              }
                            });
                          })}
                        />
                        <hr />
                      </div>
                    );
                  } else {
                    return (
                      <div className="scroller-container">
                        <HorizontalScroller
                          handleDeleteList={handleDeleteList}
                          handleLeaveList={handleLeaveList}
                          list={list}
                          key={key}
                          delete="Delete list"
                          edit="Edit list"
                          scrollerTitle={list.listName}
                          content={<p className="italic">You have not added any movies to this list...</p>}
                        />
                        <hr />
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <>
                <p className="noLists">
                  You have not made any shared lists... <br />
                  <br /> Create a new list to start adding movies.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SharedListsApi;
