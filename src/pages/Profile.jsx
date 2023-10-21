import React from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";

const Profile = () => {
  const handleSignOut = () => {
    CustomSignOut();
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Profile;
