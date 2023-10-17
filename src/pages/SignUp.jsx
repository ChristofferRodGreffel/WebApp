import React from "react";
import SignUpForm from "../Components/SignUpForm";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup">
      <img src={logo} alt="WatchBuddy logo" />
      <div>
        <p>We’re happy to have you. Lets get started!</p>
        <SignUpForm />
      </div>
      <div className="bottom-content">
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
