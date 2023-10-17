import React, { useRef, useState } from "react";
import { ButtonPrimary } from "../Components/ButtonPrimary";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const handleResetPassword = () => {};

  return (
    <div className="signup">
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
