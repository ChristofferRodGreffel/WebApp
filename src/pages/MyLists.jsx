import React, { useState } from "react";
import AddList from "../Components/AddListBtn";
import CreateNewList from "../Components/CreateNewList";

const MyLists = () => {
  const [myLists, setMyLists] = useState();
  const handleAddList = (e) => {
    e.stopPropagation();
    const popup = document.querySelector(".addToList");
    popup.style.display = "flex";
  };

  return (
    <div className="my-lists">
      <CreateNewList />
      <div>
        <h1>My lists</h1>
        <AddList function={handleAddList} />
      </div>
      <div className="all-lists">{myLists ? <p></p> : <p>You have not made any lists...</p>}</div>
    </div>
  );
};

export default MyLists;
