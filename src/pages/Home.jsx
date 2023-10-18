import React from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";

const Home = () => {
  const handleSignOut = () => {
    CustomSignOut();
  };

  return (
    <>
      <div>Home</div>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Home;
