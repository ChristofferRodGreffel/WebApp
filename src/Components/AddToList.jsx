import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import { toast } from "react-toastify";

const AddToList = (props) => {
  // Props er movie objektet som er videregivet fra Home.jsx

  const [personalLists, setPersonalLists] = useState([]);
  const [sharedLists, setSharedLists] = useState([]);

  const handleClose = () => {
    const popup = document.querySelector(".addToList");
    const body = document.querySelector("body");
    popup.style.display = "none";
    body.style.overflowY = "";
  };

  const getAllLists = async () => {
    const newPersonalLists = [];
    const newSharedLists = [];
    const iHaveAccessTo = [];

    const userName = FIREBASE_AUTH.currentUser?.displayName;

    if (!userName) {
      return;
    }

    const docRef = doc(db, "users", userName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docSnapData = docSnap.data()?.listsAccess;
      docSnapData.forEach((id) => {
        iHaveAccessTo.push(id);
      });
    } else {
      console.log("No such id!");
    }

    const querySnapshot = await getDocs(collection(db, "lists"));
    if (querySnapshot) {
      querySnapshot.forEach((list) => {
        if (iHaveAccessTo.includes(list.id)) {
          if (list.data()?.sharedWith.length == 0) {
            newPersonalLists.push(list.data());
          } else {
            newSharedLists.push(list.data());
          }
        }
      });
    }
    setPersonalLists(newPersonalLists);
    setSharedLists(newSharedLists);
  };

  useEffect(() => {
    getAllLists();
  }, []);

  const addMoviesToLists = () => {
    const checkbox = document.querySelectorAll(".list-personal-checkbox");
    checkbox.forEach((box) => {
      if (box.checked) {
        insertMovieToList(box.value);
      }
    });
  };

  const insertMovieToList = async (listId) => {
    const listRef = doc(db, "lists", listId);

    personalLists.forEach((list) => {
      if (list.listDocId === listId) {
        if (list.movies.includes(props.movie.imdb_id)) {
          toast.info(`${props.movie.title} already in ${list.listName}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    });
    sharedLists.forEach((list) => {
      if (list.listDocId === listId) {
        if (list.movies.includes(props.movie.imdb_id)) {
          toast.info(`${props.movie.title} already in ${list.listName}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    });

    await updateDoc(listRef, {
      movies: arrayUnion(props.movie.imdb_id),
    });
    toast.success(`${props.movie.title} added to list(s)`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    handleClose();
    const checkbox = document.querySelectorAll(".list-personal-checkbox");
    checkbox.forEach((box) => {
      if (box.checked) {
        box.checked = false;
      }
    });
  };

  return (
    <div className="addToList">
      <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      <div className="addToList-content">
        <div>
          <h2>Add to a list</h2>
          <p>{props.movie?.title}</p>
        </div>
        <div className="list">
          <h3>Personal lists</h3>
          <div className="list-overview">
            {personalLists.length != 0 ? (
              <>
                {personalLists?.map((list, key) => {
                  return (
                    <div key={key}>
                      <label htmlFor={key}>{list.listName}</label>
                      <input type="checkbox" className="list-personal-checkbox" id={key} value={list.listDocId} />
                    </div>
                  );
                })}
              </>
            ) : (
              <p>You don't have any personal lists</p>
            )}
          </div>
        </div>
        <div className="list">
          <h3>Your shared lists</h3>
          <div className="list-overview">
            {sharedLists.length != 0 ? (
              <>
                {sharedLists?.map((list, key) => {
                  return (
                    <div key={key}>
                      <label htmlFor={key}>{list.listName}</label>
                      <input type="checkbox" className="list-personal-checkbox" id={key} value={list.listDocId} />
                    </div>
                  );
                })}
              </>
            ) : (
              <p>You don't have any shared lists</p>
            )}
          </div>
        </div>

        <button className="addSelectedMovies" onClick={addMoviesToLists}>
          Add movie to selected lists
        </button>
      </div>
    </div>
  );
};

export default AddToList;
