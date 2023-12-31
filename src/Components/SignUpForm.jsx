import React, { useRef, useState } from "react";
import { CustomSignUp } from "../Helperfunctions/CustomSignUp";
import { ButtonPrimary } from "./ButtonPrimary";
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

// Udviklet fælles i gruppen

function SignInForm() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const navigate = useNavigate();

  // Function that calls our Sign up function, passing the values needed.
  const handleSignUp = (e) => {
    e.preventDefault();
    CustomSignUp(formRef, setLoading, navigate);
  };

  return (
    <form ref={formRef} onSubmit={handleSignUp}>
      <div>
        <label htmlFor="signUpEmail">E-mail</label>
        <input id="signUpEmail" type="email" disabled={loading} name="signUpEmail" placeholder="Your email..."></input>
      </div>
      <div>
        <label htmlFor="signUpUsername">Username</label>
        <input id="signUpUsername" type="text" disabled={loading} name="signUpUsername" placeholder="Your username..."></input>
      </div>
      <div>
        <label htmlFor="signUpPassword">Password</label>
        <input id="signUpPassword" type="password" disabled={loading} name="signUpPassword" placeholder="Enter password..."></input>
      </div>
      <div className="referral">
        <h3>Invited by a friend?</h3>
        <label htmlFor="signUpInvited">Who invited you?</label>
        <input id="signUpInvited" type="text" disabled={loading} name="signUpInvited" placeholder="Your friends username"></input>
        <p>
          You get 25 points and your friend gets 10 points* <br />* First redeem grants your friend 25 points too!
        </p>
      </div>

      {loading ? (
        <>
          <div className="loader">
            <CircleLoader color={"#dadada"} loading={loading} size={100} cssOverride={{}} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        </>
      ) : (
        <>
          <ButtonPrimary content="Sign Up" disabled={loading} type="submit" />
        </>
      )}
    </form>
  );
}

export default SignInForm;
