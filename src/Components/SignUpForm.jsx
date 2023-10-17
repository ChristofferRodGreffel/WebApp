import React, { useRef, useState } from "react";
import { CustomSignUp } from "../Helperfunctions/CustomSignUp";
import { ButtonPrimary } from "./ButtonPrimary";

function SignInForm() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

    // Function that calls our Sign up function, passing the values needed.
    const handleSignUp = (e) => {
        e.preventDefault()
        CustomSignUp(formRef, setLoading)
    }

  return (
    <form ref={formRef} onSubmit={handleSignUp}>
      <div>
        <label htmlFor="signUpEmail">E-mail</label>
        <input
          id="signUpEmail"
          type="email"
          disabled={loading}
          name="signUpEmail"
          placeholder="Write email here..."
        ></input>
      </div>
      <div>
        <label htmlFor="signUpPassword">Password</label>
        <input
          id="signUpPassword"
          type="password"
          disabled={loading}
          name="signUpPassword"
          placeholder="Write password here..."
        ></input>
      </div>

      <ButtonPrimary content="Sign Up" disabled={loading} type="submit" />
    </form>
  );
}

export default SignInForm;
