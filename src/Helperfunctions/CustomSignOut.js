import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";

export function CustomSignOut() {

    // Sign out the user

    signOut(FIREBASE_AUTH).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}