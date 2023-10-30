import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../Components/ButtonPrimary";

// Udviklet fælles i gruppen

const SearchField = () => {
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
    </div>
  );
};

export default SearchField;
