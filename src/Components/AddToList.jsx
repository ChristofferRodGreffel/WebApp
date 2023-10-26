import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, db } from "../../firebase-config";

const AddToList = (props) => {
  const [personalLists, setPersonalLists] = useState([]);

  const handleClose = () => {
    const popup = document.querySelector(".addToList");
    popup.style.display = "none";
  };

  const getAllLists = async () => {
    const newLists = [];
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
          newLists.push(list.data());
        }
      });
    }
    setPersonalLists(newLists);
  };

  useEffect(() => {
    getAllLists();
  }, []);

  const createNewList = (e) => {
    e.preventDefault();
  };

  const addMoviesToLists = () => {
    const checkbox = document.querySelectorAll(".list-personal-checkbox");
    checkbox.forEach((box) => {
      if (box.checked) {
        console.log(box.value);
        insertMovieToList(box.value);
      }
    });
  };

  const insertMovieToList = async (listId) => {
    const listRef = doc(db, "lists", listId);

    await updateDoc(listRef, {
      movies: arrayUnion(props.movie.imdb_id),
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
          {personalLists?.map((list, key) => {
            return (
              <div key={key}>
                <label htmlFor={list.listName}>{list.listName}</label>
                <input type="checkbox" className="list-personal-checkbox" id={list.listName} value={list.listDocId} />
              </div>
            );
          })}
        </div>
        <div className="list">
          <h3>Your shared lists</h3>
          {props.personalList?.map((listItem) => {
            return (
              <div>
                <label>{listItem.title}</label>
                <input type="checkbox" />
              </div>
            );
          })}
        </div>
        <div className="addNewList">
          <h4>Create new personal list</h4>
          <form>
            <input type="text" placeholder="Add a list name" />
            <button type="submit" onClick={createNewList}>
              Create new list
            </button>
          </form>
        </div>
        <button onClick={addMoviesToLists}>Add movie to selected lists</button>
      </div>
    </div>
  );
};

export default AddToList;
