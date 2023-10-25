import React, { useEffect, useState } from "react";
import AddList from "../Components/AddListBtn";
import CreateNewList from "../Components/CreateNewList";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import HorizontalScroller from "../Components/HorizontalScroller";
import MovieCard from "../Components/MovieCard";

const MyLists = () => {
  const [myLists, setMyLists] = useState([]);

  const handleAddList = (e) => {
    e.stopPropagation();
    const popup = document.querySelector(".addToList");
    popup.style.display = "flex";
  };

  const getAllLists = async () => {
    const newLists = [];
    const iHaveAccessTo = [];

    const userName = FIREBASE_AUTH.currentUser?.displayName;

    // Følgende linjer henter de list id'er, som "userName" har adgang til og ligger
    // dem i variablen "iHaveAccessTo"
    const docRef = doc(db, "users", userName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docSnapData = docSnap.data()?.listsAccess;
      docSnapData.forEach((id) => {
        iHaveAccessTo.push(id);
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such id!");
    }

    // Følgende linjer henter alle lister, som ligger i vores Firestor
    // ... også dem, man ikke har adgang til
    const querySnapshot = await getDocs(collection(db, "lists"));
    // Følgende linjer tjekker for hver enkelt liste,
    // om listen findes i den array som findes i "iHaveAccessTo"
    // ... hvis den findes, så tilføjes listen til variablen "newLists"
    querySnapshot.forEach((list) => {
      if (iHaveAccessTo.includes(list.id)) {
        newLists.push(list.data());
      }
    });
    // Efter at have tilføjet alle de lister, man har adgang til "newLists"
    // sætter den "newLists" til vores useState "myLists, setMyLists"
    setMyLists(newLists);
  };

  useEffect(() => {
    // Kører funktionen "getAllLists", når man går ind på siden
    getAllLists();
  }, []);

  return (
    <div className="my-lists">
      {/* CreateNewList komponenten har fået en props, som er den funktion, getAllLists(), der henter de lister */}
      {/* man har adgang til */}
      <CreateNewList onUpdate={getAllLists} />
      <div>
        <h1>My lists</h1>
        <AddList function={handleAddList} />
      </div>
      <div className="all-lists">
        {myLists.length != 0 ? (
          <>
            {myLists.map((list, key) => {
              return (
                <div key={key}>
                  <HorizontalScroller
                    scrollerTitle={list.listName}
                    content={
                      list.movies.length != 0 ? (
                        <>
                          {list.movies?.map((movie, key) => {
                            return <MovieCard key={key} id={movie.imdb_id} title={movie.title} url={movie.poster_image} rating={movie.rating.toPrecision(2)} icon={"fa-solid fa-plus"} />;
                          })}
                        </>
                      ) : (
                        <>
                          <p>Add a movie to the list you dumbass</p>
                        </>
                      )
                    }
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <p>You have not made any lists...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MyLists;
