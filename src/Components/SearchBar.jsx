import React from "react";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <div className="search-input">
        <i class="fa-solid fa-magnifying-glass"></i>
        <form>
          <input type="text" placeholder="Search for content..." />
        </form>
      </div>
      <div className="search-buttons">
        <button>My lists</button>
        <button>Shared lists</button>
        <button>All genres</button>
      </div>
    </div>
  );
};

export default SearchBar;
