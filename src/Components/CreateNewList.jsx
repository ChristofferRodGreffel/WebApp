import React, { useState } from "react";
import UserSelection from "./UserSelection";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

// Komponenten modtager funktionen getAllLists(), som er videreført
const CreateNewList = (props) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [listName, setListName] = useState("");

  const handleClose = () => {
    const popup = document.querySelector(".addToList");
    popup.style.display = "none";
  };

  const uid = FIREBASE_AUTH.currentUser?.uid;

  const handleCreateList = (e) => {
    e.preventDefault();
    const newListObject = {
      author: uid,
      listName: listName,
      sharedWith: selectedUsers.map((user) => {
        return user.value;
      }),
      movies: [],
    };

    insertList(newListObject);
  };

  async function insertList(list) {
    try {
      const listData = await addDoc(collection(db, "lists"), list);
      const listId = listData.id;

      updateAccess(listId);

      setListName("");
      setSelectedUsers([]);

      toast.success(`${list.listName} added succesfully`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function updateAccess(listId) {
    const username = getAuth().currentUser?.displayName;
    try {
      const userRef = doc(db, "users", username);
      const listRef = doc(db, "lists", listId);

      await updateDoc(listRef, {
        listDocId: listId,
      });

      await updateDoc(userRef, {
        listsAccess: arrayUnion(listId),
      });

      // Her deler vi listen med de valgte brugere
      selectedUsers.forEach(async (user) => {
        const userRef = doc(db, "users", user.value);

        await updateDoc(userRef, {
          listsAccess: arrayUnion(listId),
        });
      });

      // Kører funktionen, der henter de lister man har adgang til
      // funktionen blev videreført gennem props
      props.onUpdate();
      handleClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="addToList">
      <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      <div className="addToList-content">
        <div className="addNewList">
          <form onSubmit={handleCreateList}>
            <label htmlFor="listName">What is the name of the list</label>
            <input type="text" id="listName" placeholder="Add a list name" required value={listName} onChange={(e) => setListName(e.target.value)} />
            <label htmlFor="sharedWith">Would you like to share the list?</label>
            <UserSelection selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            <button type="submit">Add new list</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewList;
