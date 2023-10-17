import React from "react";
import SignInForm from "../Components/SignInForm";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function SignIn() {
  return (
    <div className="signup">
      <img src={logo} alt="WatchBuddy logo" />
      <div>
        <p>Welcome back, please log in</p>
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
