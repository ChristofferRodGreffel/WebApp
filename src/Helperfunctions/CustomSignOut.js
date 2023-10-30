import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";

// Udviklet fælles i gruppen

export function CustomSignOut() {
  // Sign out the user

  signOut(FIREBASE_AUTH)
    .then(() => {
      // Sign-out successful.
      // Udløser funktionen i app.jsx, så man bliver navigeret til signin.
    })
    .catch((error) => {
      // An error happened.
    });
}
