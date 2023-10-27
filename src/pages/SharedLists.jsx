import React, { useEffect, useState } from "react";
import AddListBtn from "../Components/AddListBtn";
import CreateNewList from "../Components/CreateNewList";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";
import { staticMovies } from "../staticmovies.js";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

// Den eneste forskel mellem MyLists og SharedLists er i funktionen getAllLists, hvor vi spørger på om
// længden på sharedWith IKKE er lig med 0, modsat MyLists, hvor vi spørger om den er lig 0.

const SharedLists = () => {
  const [myLists, setMyLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);

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
      setLoading(true);
      const docSnapData = docSnap.data()?.listsAccess;
      docSnapData.forEach((id) => {
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
          if (list.data()?.sharedWith.length !== 0) {
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

  // Her benyttes en useEffect til at checke om brugeren er logget ind og efterfølgende
  // fylde vores useState "userName", med brugerens brugernavn
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Kører funktionen "getAllLists", når brugeren er godkendt og data er lagt i vores useState.
    if (userName) {
      getAllLists();
    }
  }, [userName]);

  const handleDeleteList = async (list) => {
    await deleteDoc(doc(db, "lists", list.listDocId));
    toast.success(`${list.listName} removed succesfully`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    getAllLists();
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
        {myLists.length != 0 ? (
          <>
            {loading && <p>LOADING</p>}
            {/* First we map myList, which returns each list the user has access to */}
            {myLists.map((list, key) => {
              if (list.movies.length != 0) {
                return (
                  // Then we return the HorizontalScroller component and pass the listName and
                  // content, which in this case is all of the imdb id's of the list.
                  <div className="scroller-container" key={key}>
                    <HorizontalScroller
                      handleDeleteList={handleDeleteList}
                      list={list}
                      delete="Delete list"
                      edit="Edit list"
                      scrollerTitle={list.listName}
                      content={list.movies.map((id) => {
                        return staticMovies.movies.map((movie, key) => {
                          if (movie.imdb_id === id) {
                            return (
                              <MovieCard
                                getLists={getAllLists}
                                listId={list.listDocId}
                                remove={true}
                                key={key}
                                id={movie.imdb_id}
                                title={movie.title}
                                url={movie.poster_image}
                                rating={movie.rating?.toPrecision(2)}
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
                      delete="Delete list"
                      edit="Edit list"
                      list={list}
                      key={key}
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
      </div>
    </div>
  );
};

export default SharedLists;
