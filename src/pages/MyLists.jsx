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

    const newLists = []
    const iHaveAccessTo = []

    const userName = FIREBASE_AUTH.currentUser?.displayName

    const docRef = doc(db, "users", userName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docSnapData = docSnap.data()?.listsAccess
      docSnapData.forEach((id) => {
        iHaveAccessTo.push(id)
      });

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    const querySnapshot = await getDocs(collection(db, "lists"));
    querySnapshot.forEach((list) => {
      if (iHaveAccessTo.includes(list.id)) {
        newLists.push(list.data());
      }
    });
    setMyLists(newLists);
  };

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <div className="my-lists">
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
