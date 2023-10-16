import { useEffect, useState } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase-config";
import SignInForm from "./Components/SignInForm";
import SignUpForm from "./Components/SignUpForm";

function App() {

  const [user, setUser] = useState('')  
  
  useEffect(() => {
    
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(uid)
        // ...
      } else {
        setUser('')
        // User is signed out
        // ...
      }
    });
  }, [])

  const handleSignOut = () => {
    signOut(FIREBASE_AUTH).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      <SignUpForm />
      <SignInForm />

      <button onClick={handleSignOut}>Sign out</button>

      <h2>{user}</h2>

      <h1>Hej Christoffer, det virker stadig</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
