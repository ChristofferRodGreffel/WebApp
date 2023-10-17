import React, { useRef, useState } from "react";
import { FIREBASE_AUTH } from "../../firebase-config";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { CustomSignIn } from "../Helperfunctions/CustomSignIn";
import { ButtonPrimary } from "./ButtonPrimary";

function SignInForm() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

    // Function that calls our Sign in function, passing the values needed.
    const handleSignIn = (e) => {
        e.preventDefault()
        CustomSignIn(formRef, setLoading)
    }

  return (
    <form ref={formRef} onSubmit={handleSignIn}>
      <div>
        <label htmlFor="signInEmail">E-mail</label>
        <input
          id="signInEmail"
          type="email"
          disabled={loading}
          name="signInEmail"
          placeholder="Write email here..."
        ></input>
      </div>
      <div>
        <label htmlFor="signInPassword">Password</label>
        <input
          id="signInPassword"
          type="password"
          disabled={loading}
          name="signInPassword"
          placeholder="Write password here..."
        ></input>
      </div>

      <ButtonPrimary content="Sign In" disabled={loading} type="submit" />
    </form>
  );
}

export default SignInForm;
