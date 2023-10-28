import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { searchParam } = useParams();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/searchresults/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="searchbar">
      <div className="search-input">
        <i className="fa-solid fa-magnifying-glass"></i>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search for content..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
