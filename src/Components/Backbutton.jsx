import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Backbutton = () => {
  const navigate = useNavigate();
  const { imdbid } = useParams();
  const handleGoBack = () => {
    navigate(-1);
    if (imdbid) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="LeftArrow" onClick={handleGoBack}>
      <i className="fa-solid fa-angle-left"></i>
    </div>
  );
};

export default Backbutton;
