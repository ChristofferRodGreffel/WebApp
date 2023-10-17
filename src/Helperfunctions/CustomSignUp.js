import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { useNavigate } from "react-router-dom";

export function CustomSignUp(form, customSetLoad, navigate) {
  // Sets the loading state to true, so user gets feedback
  // afterwards signin in with the passed values

  customSetLoad(true);

  const signUpEmail = form.current?.signUpEmail.value;
  const signUpPassword = form.current?.signUpPassword.value;

  try {
    createUserWithEmailAndPassword(FIREBASE_AUTH, signUpEmail, signUpPassword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert(user.uid);
        form.current?.reset();
        navigate("/home");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ... wrong information passed, or server is down. Checks whenever we
        // have a custom message to the user...
        alert(firebaseErrorsCodes[errorCode] || errorMessage);
      });
  } finally {
    // Sets the loading state to false, whenever the function is done.
    customSetLoad(false);
  }
}
