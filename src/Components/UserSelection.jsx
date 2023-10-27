import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import Select from "react-select";

function UserSelection(props) {
  const [users, setUsers] = useState([]);

  const currentUser = FIREBASE_AUTH.currentUser?.displayName;

  // Get list of users

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
