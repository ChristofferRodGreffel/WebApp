import React from "react";
import SignInForm from "../Components/SignInForm";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function SignIn() {
  return (
    <div className="signup">
      <img src={logo} alt="WatchBuddy logo" />
      <p>Welcome back, please log in</p>
      <SignInForm />
      <div className="bottom-content">
        <p>
          Don't have an account yet? <Link to="/">Sign Up</Link>
        </p>
        <Link to="/">Reset password</Link>
      </div>
    </div>
  );
}

export default SignIn;
