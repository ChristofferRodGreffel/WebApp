import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import Select from "react-select";

function UserSelection(props) {
  const [users, setUsers] = useState([]);

  // Get list of users

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);

      let result = false;

      querySnapshot.forEach((name) => {
        // doc.data() is never undefined for query doc snapshots
        const userObject = {
          label: name.id,
          value: name.id,
          group: "All users",
        };

        setUsers((users) => [...users, userObject]);
      });
    };

    getUsers();
  }, []);

  const userGroups = ["All users"];

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
