import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/points" activeclassname="active">
        <i className="fa-brands fa-ethereum"></i>
        <p>Points</p>
      </NavLink>
      <NavLink to="/home" activeclassname="active">
        <i className="fa-solid fa-film"></i>
        <p>Home</p>
      </NavLink>
      <NavLink to="/profile" activeclassname="active">
        <i className="fa-solid fa-user"></i>
        <p>Profile</p>
      </NavLink>
    </nav>
  );
};

export default Navigation;
