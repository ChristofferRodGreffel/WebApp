import React from "react";

// Udviklet fælles i gruppen

const AddListBtn = (props) => {
  return (
    <button className="add-list" onClick={props.function}>
      New list <i className="fa-solid fa-plus"></i>
    </button>
  );
};

export default AddListBtn;
