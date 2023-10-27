import React, { useEffect } from "react";
import SignInForm from "../Components/SignInForm";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    // Function that runs whenever the the user status changes (logged in / logged out)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in
        navigate("/home");
      } else {
        navigate("/");
        // User is signed out
      }
    });
  }, []);

  return (
    <div className="signup">
      <img src={logo} alt="WatchBuddy logo" />
      <div>
        <h1>Welcome back, please log in</h1>
        <SignInForm />
      </div>
      <div className="bottom-content">
        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
        <Link to="/reset">Reset password</Link>
      </div>
    </div>
  );
}

export default SignIn;
