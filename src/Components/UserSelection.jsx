import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import Select from "react-select";

// Udviklet fælles i gruppen

function UserSelection(props) {
  const [users, setUsers] = useState([]);

  const currentUser = FIREBASE_AUTH.currentUser?.displayName;

  // Her henter vi en liste af brugere som man kan vælge at dele sin liste med.
  // Vi sørger for at brugeren selv ikke er i listen.

  // På sigt vil vi lave en gruppe der hedder "Friends", hvor vi nu kun har "Other users"

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
