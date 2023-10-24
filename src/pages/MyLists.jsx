import React, { useEffect, useState } from "react";
import AddList from "../Components/AddListBtn";
import CreateNewList from "../Components/CreateNewList";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import HorizontalScroller from "../Components/HorizontalScroller";
import { staticMovies } from "../staticmovies";
import MovieCard from "../Components/MovieCard";

const MyLists = () => {
  const [myLists, setMyLists] = useState([]);
  const handleAddList = (e) => {
    e.stopPropagation();
    const popup = document.querySelector(".addToList");
    popup.style.display = "flex";
  };

  useEffect(() => {
    const getAllLists = async () => {
      setMyLists([])
      const querySnapshot = await getDocs(collection(db, "lists"));
      querySnapshot.forEach((list) => {

        const listData = list.data()

        setMyLists((myList) => [...myList, listData])
      });
    }
    getAllLists()
  }, [])

  return (
    <div className="my-lists">
      <CreateNewList />
      <div>
        <h1>My lists</h1>
        <AddList function={handleAddList} />
      </div>
      <div className="all-lists">{myLists.length != 0 ?
        <>
          {myLists.map((list, key) => {
            return (
              <HorizontalScroller
                scrollerTitle={list.listName}
                content={list.movies.length != 0 ?
                  <>
                    {list.movies?.map((movie, key) => {
                      return <MovieCard key={key} id={movie.imdb_id} title={movie.title} url={movie.poster_image} rating={movie.rating.toPrecision(2)} icon={"fa-solid fa-plus"} />;
                    })}
                  </>
                  :
                  <>
                    <p>Add a movie to the list you dumbass</p>
                  </>
                }
              />
            )
          })}
        </>
        :
        <>
          <p>You have not made any lists...</p>
        </>
      }
      </div>
    </div>
  );
};

export default MyLists;
