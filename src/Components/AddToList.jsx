import React from "react";

const AddToList = (props) => {
  const handleClose = () => {
    const popup = document.querySelector(".addToList");
    popup.style.display = "none";
  };

  return (
    <div className="addToList">
      <i className="fa-solid fa-xmark" onClick={handleClose}></i>
      <div className="addToList-content">
        <div>
          <h2>Add to a list</h2>
          <p>{props.movieName}</p>
        </div>
        <div className="list">
          <h3>Personal lists</h3>
          {props.personalList?.map((listItem) => {
            return (
              <div>
                <label>{listItem.title}</label>
                <input type="checkbox" />
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
            <button type="submit">Add new list</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddToList;
