import React, { useRef, useState } from "react";
import { ButtonPrimary } from "../Components/ButtonPrimary";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { Link } from "react-router-dom";



const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const handleResetPassword = (e) => {
    e.preventDefault()

    const email = formRef.current?.resetPassword.value

    sendPasswordResetEmail(FIREBASE_AUTH, email)
      .then(() => {
        // Password reset email sent!
        alert("Password send, please check your email. Be sure to check spam too if you can't find it.")
        formRef.current?.reset()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="signup">
          <Link to="/signin">{`<-- back to login`}</Link>
      <p>
        Forget your password? Kein problemo. <br />
        <br /> We'll send you a reset link
      </p>
      <form ref={formRef} onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="resetPassword">E-mail</label>
          <input
            id="resetPassword"
            type="email"
            disabled={loading}
            name="resetPassword"
            placeholder="Write email here..."
          ></input>
        </div>

        <ButtonPrimary content="Send reset email" disabled={loading} type="submit" />
      </form>


    </div>
  );
};

export default ResetPassword;
