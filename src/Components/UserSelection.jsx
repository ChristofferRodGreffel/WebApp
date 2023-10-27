import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import Select from "react-select";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserSelection(props) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // Her henter vi en liste af brugere som man kan vælge at dele sin liste med.
  // Vi sørger for ikke at brugeren selv i listen. Dette bruger vi onAuthStateChanged til.

  useEffect(() => {
    const getUsers = async () => {
      const newUsers = [];
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((name) => {
        if (name.id !== currentUser) {
          const userObject = {
            label: name.id,
            value: name.id,
            group: "Other users",
          };
          newUsers.push(userObject);
        }
      });
      setUsers(newUsers);
    };

    getUsers();
  }, [currentUser]);

  // Denne useEffect er tilføjet for at sikre at brugeren der er logget ind hele tiden bliver opdateret
  // og derfor kan bruges overstående useEffect, hvor vi ikke ønsker at vise brugeren selv i dropdown menuen.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setCurrentUser(user.displayName);
      } else {
        setCurrentUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const userGroups = ["Other users"];

  const handleChange = (selectedOptions) => {
    props.setSelectedUsers(selectedOptions);
  };

  const options = userGroups.map((group) => ({
    label: group,
    options: users?.filter((user) => user.group === group),
  }));

  return <Select className="react-select-container" classNamePrefix="react-select" isMulti options={options} value={props.selectedUsers} onChange={handleChange} />;
}

export default UserSelection;
