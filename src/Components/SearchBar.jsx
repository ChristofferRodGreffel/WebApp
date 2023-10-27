import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  return (
    <div className="searchbar">
      <div className="search-input">
        <i className="fa-solid fa-magnifying-glass"></i>
        <form>
          <input type="text" placeholder="Search for content..." />
        </form>
      </div>
      <div className="search-buttons">
        <button
          onClick={() => {
            navigate("/mylists");
          }}
        >
          My lists
        </button>
        <button
          onClick={() => {
            navigate("/sharedlists");
          }}
        >
          Shared lists
        </button>
        <button>All genres</button>
      </div>
    </div>
  );
};

export default SearchBar;
