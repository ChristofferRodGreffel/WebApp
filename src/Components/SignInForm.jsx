import React, { useRef, useState } from "react";
import { FIREBASE_AUTH } from "../../firebase-config";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { CustomSignIn } from "../Helperfunctions/CustomSignIn";
import { ButtonPrimary } from "./ButtonPrimary";
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef(null);

  // Function that calls our Sign in function, passing the values needed.
  const handleSignIn = (e) => {
    e.preventDefault();
    CustomSignIn(formRef, setLoading, navigate);
  };

  return (
    <form ref={formRef} onSubmit={handleSignIn}>
      <div>
        <label htmlFor="signInEmail">E-mail</label>
        <input id="signInEmail" type="email" disabled={loading} name="signInEmail" placeholder="Your email here..."></input>
      </div>
      <div>
        <label htmlFor="signInPassword">Password</label>
        <input id="signInPassword" type="password" disabled={loading} name="signInPassword" placeholder="Your password here..."></input>
      </div>

      {loading ? (
        <>
          <div className="loader">
            <CircleLoader color={"#dadada"} loading={loading} size={100} cssOverride={{}} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        </>
      ) : (
        <>
          <ButtonPrimary content="Sign In" disabled={loading} type="submit" />
        </>
      )}
    </form>
  );
}

export default SignInForm;
