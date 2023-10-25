import React from "react";
import { CustomSignOut } from "../Helperfunctions/CustomSignOut";
import defaultuser from "../assets/defaultuser.svg";
import { FIREBASE_AUTH } from "../../firebase-config";
import { ButtonPrimary } from "../Components/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";

const Profile = () => {
  const userName = FIREBASE_AUTH.currentUser?.displayName;

  const handleSignOut = () => {
    CustomSignOut();
  };

  const copyText = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(userName);

    toast.success(`Copied ${userName} to clipboard`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleResetPassword = () => {
    const email = FIREBASE_AUTH.currentUser.email;

    sendPasswordResetEmail(FIREBASE_AUTH, email)
      .then(() => {
        // Password reset email sent!
        toast.success("Password send, please check your email. Be sure to check spam too if you can't find it.", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${firebaseErrorsCodes[errorCode] || errorMessage}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const icon = <FontAwesomeIcon icon={faRightFromBracket} />;

  return (
    <div className="profile">
      <div className="image-container">
        <img src={defaultuser} alt="user profile image" />
        <h2>{userName}</h2>
        <p className="referral" onClick={copyText}>
          Your invite code: {userName}
        </p>
      </div>
      <div className="profile-menu">
        <div className="menu-section">
          <div>
            <i className="fa-solid fa-user-group"></i>
            <p>Friends</p>
          </div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="menu-section">
          <div>
            <i className="fa-solid fa-cog"></i>
            <p>Settings</p>
          </div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="menu-section">
          <div>
            <i className="fa-solid fa-bell"></i>
            <p>Notification</p>
          </div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <ButtonPrimary content="Sign Out " icon={icon} function={handleSignOut} />
        <ButtonPrimary content="Reset password " icon={icon} function={handleResetPassword} />
      </div>
    </div>
  );
};

export default Profile;
