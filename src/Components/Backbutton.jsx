import React from "react";
import { useNavigate } from "react-router-dom";

const Backbutton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="LeftArrow" onClick={handleGoBack}>
      <i className="fa-solid fa-angle-left"></i>
    </div>
  );
};

export default Backbutton;