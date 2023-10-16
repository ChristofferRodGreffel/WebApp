import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";

export function CustomSignIn(form, customSetLoad) {

    customSetLoad(true)

    const signInEmail = form.current?.signInEmail.value
    const signInPassword = form.current?.signInPassword.value

    try {
        signInWithEmailAndPassword(FIREBASE_AUTH, signInEmail, signInPassword)
            .then((userCredential) => {
                // Signed in
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