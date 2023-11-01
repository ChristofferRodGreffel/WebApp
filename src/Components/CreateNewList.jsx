import React, { useState } from "react";
import UserSelection from "./UserSelection";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

// Udviklet fælles i gruppen

// Komponenten modtager funktionen getAllLists(), som er videreført
const CreateNewList = (props) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [listName, setListName] = useState("");

  // Lukker popup
  const handleClose = () => {
    const popup = document.querySelector(".createNewList");
    popup.style.display = "none";
  };

  const uid = FIREBASE_AUTH.currentUser?.uid;

  // Laver et listobjekt og giver det videre til insertList
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

  // Modtager listobjektet og tilføjer til lists i firestore og kører updateAccess
  const insertList = async (list) => {
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
  };

  // Modtager listId fra insertList og tilføjer listId til listen og opdaterer listAccess for valgte brugere og brugeren selv
  async function updateAccess(listId) {
    const username = getAuth().currentUser?.displayName;
    try {
      const userRef = doc(db, "users", username);
      const listRef = doc(db, "lists", listId);

      // Tilføjer listId til listen
      await updateDoc(listRef, {
        listDocId: listId,
      });

      // Opdaterer brugerens listAccess array, som er de lister brugeren har adgang til.
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
    <div className="createNewList">
      <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      <div className="createNewList-content">
        <div className="addNewList">
          <form onSubmit={handleCreateList}>
            <label htmlFor="listName">What is the name of the list</label>
            <input type="text" id="listName" placeholder="Add a list name" maxLength={30} required value={listName} onChange={(e) => setListName(e.target.value)} />
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
