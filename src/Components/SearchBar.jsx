import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "./ButtonPrimary";

// Udviklet fælles i gruppen

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Navigerer til siden searchresults, som benytter API
  // Medtager søgeordet som params
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
          <ButtonPrimary content="Search" />
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
