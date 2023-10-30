import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, db } from "../../firebase-config";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { collection, query, getDocs, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Udviklet fælles i gruppen

// Denne funktion køres inde i CustomSignUp funktionen.
async function insertUsername(signUpUsername, navigate, customSetLoad) {
  try {
    // Tilføjer brugeren til firestore med brugernavn og inviteCode.
    await setDoc(doc(db, "users", signUpUsername), {
      userName: signUpUsername,
      inviteCode: signUpUsername,
    });

    // Tilføjer displayName for brugeren i auth altså IKKE i firestore.
    // På den kan vi få brugernavn på den bruger der er logget ind, på en nem måde.
    updateProfile(FIREBASE_AUTH.currentUser, {
      displayName: signUpUsername,
    }).catch((error) => {
      console.log("Error adding username:", error);
    });

    customSetLoad(false);
    navigate("/home");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Her oprettes brugeren.
export async function CustomSignUp(form, customSetLoad, navigate) {
  // Sets the loading state to true, so user gets feedback
  // afterwards signin in with the passed values

  customSetLoad(true);

  const signUpUsername = form.current?.signUpUsername.value;

  const signUpEmail = form.current?.signUpEmail.value;
  const signUpPassword = form.current?.signUpPassword.value;

  if (!signUpUsername) {
    toast.error("Please write a username", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    customSetLoad(false);
    return;
  }

  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  let result = false;

  // Tjekker om brugernavnet allerede er i brug. Giver feedback hvis det er i brug.
  querySnapshot.forEach((name) => {
    if (signUpUsername.toLowerCase() === name.id.toLowerCase()) {
      toast.error("Sorry, this username is already taken...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      result = true;
      customSetLoad(false);
      return;
    }
  });

  if (result) {
    return;
  }

  // Her oprettes brugeren og kører insertUsername
  try {
    createUserWithEmailAndPassword(FIREBASE_AUTH, signUpEmail, signUpPassword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        form.current?.reset();

        insertUsername(signUpUsername, navigate, customSetLoad);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ... wrong information passed, or server is down. Checks whenever we
        // have a custom message to the user...
        customSetLoad(false);
        toast.error(`${firebaseErrorsCodes[errorCode] || errorMessage}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      });
  } finally {
  }
}
