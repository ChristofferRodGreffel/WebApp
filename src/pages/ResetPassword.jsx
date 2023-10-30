import React, { useRef, useState } from "react";
import { ButtonPrimary } from "../Components/ButtonPrimary";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import logo from "../assets/logo.svg";

// Komponent udvilket i fælleskab i gruppen

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  // Bruges til at sende brugeren en email med reset link
  // Benytter firebase's indbyggede sendPasswordResetEmail funktion
  const handleResetPassword = (e) => {
    e.preventDefault();

    const email = formRef.current?.resetPassword.value;

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
        formRef.current?.reset();
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
        // ..
      });
  };

  return (
    <div className="signup reset">
      <img src={logo} alt="WatchBuddy logo" />
      <div>
        <h1>Forgot your password?</h1>
        <p>No problem, we'll send you a reset link!</p>
      </div>
      <form ref={formRef} onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="resetPassword">E-mail</label>
          <input id="resetPassword" type="email" disabled={loading} name="resetPassword" placeholder="Write your email here..."></input>
        </div>

        <ButtonPrimary content="Send reset email" disabled={loading} type="submit" />
      </form>
      <Link to="/signin">
        <i className="fa-solid fa-arrow-left"></i> Back to login
      </Link>
    </div>
  );
};

export default ResetPassword;
