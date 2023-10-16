import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";

export function CustomSignUp(form, customSetLoad) {

    customSetLoad(true)

    const signUpEmail = form.current?.signUpEmail.value
    const signUpPassword = form.current?.signUpPassword.value

    try {
        createUserWithEmailAndPassword(FIREBASE_AUTH, signUpEmail, signUpPassword)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                alert(user.uid)
                form.current?.reset()

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(firebaseErrorsCodes[errorCode] || errorMessage)
            });
    }

    finally {
        customSetLoad(false)
    }
}