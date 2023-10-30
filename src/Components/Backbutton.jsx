import React from "react";
import { useNavigate } from "react-router-dom";

// Udviklet fælles i gruppen

// Komponenten bruger useNavigate til at gå én side tilbage.
const Backbutton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo(0, 0); // Scroller til toppen af siden
    }, 100);
  };

  return (
    <div className="LeftArrow" onClick={handleGoBack}>
      <i className="fa-solid fa-angle-left"></i>
    </div>
  );
};

export default Backbutton;
